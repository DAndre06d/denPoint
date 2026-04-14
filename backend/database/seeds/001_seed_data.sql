INSERT INTO users (email, password_hash, firstname, lastname, phone_number, role)
VALUES
  (
    'patient@denpoint.local',
    '$2b$10$FF8xB0ghMNyXDXcRek5XE.v4HG2JJjfwoP64SdkL4fwFZ2xcK.nSK',
    'Demo',
    'Patient',
    '09171234567',
    'patient'
  ),
  (
    'admin@denpoint.local',
    '$2b$10$FF8xB0ghMNyXDXcRek5XE.v4HG2JJjfwoP64SdkL4fwFZ2xcK.nSK',
    'Demo',
    'Admin',
    '09179876543',
    'admin'
  )
ON DUPLICATE KEY UPDATE
  firstname = VALUES(firstname),
  lastname = VALUES(lastname),
  phone_number = VALUES(phone_number),
  role = VALUES(role);

SET @maria_keep_id := (
  SELECT MIN(id)
  FROM dentists
  WHERE full_name = 'Dr. Maria Santos'
    AND specialty = 'genDentistry'
);

UPDATE appointments
SET dentist_id = @maria_keep_id
WHERE dentist_id IN (
  SELECT id
  FROM (
    SELECT id
    FROM dentists
    WHERE full_name = 'Dr. Maria Santos'
      AND specialty = 'genDentistry'
      AND id <> @maria_keep_id
  ) AS duplicate_dentists
);

DELETE FROM dentists
WHERE full_name = 'Dr. Maria Santos'
  AND specialty = 'genDentistry'
  AND id <> @maria_keep_id;

INSERT INTO dentists (full_name, specialty, time)
VALUES
  ('Dr. Maria Santos', 'genDentistry', '10:00-11:30'),
  ('Dr. Paolo Reyes', 'periodontics', '14:30-16:30'),
  ('Dr. Andrea Cruz', 'OSID', '10:00-11:30'),
  ('Dr. Miguel Navarro', 'OCA', '16:30-18:00'),
  ('Dr. Sophia Lim', 'prosthodontics', '13:00-14:30')
ON DUPLICATE KEY UPDATE
  full_name = VALUES(full_name),
  specialty = VALUES(specialty),
  time = VALUES(time);

INSERT INTO appointments (user_id, dentist_id, appointment_date, status, concern, time, typeOfService)
SELECT
  u.id,
  d.id,
  DATE_ADD(CURDATE(), INTERVAL 1 DAY),
  'scheduled',
  'Initial consultation',
  '10:00-11:30',
  d.specialty
FROM users u
JOIN dentists d ON d.full_name = 'Dr. Maria Santos' AND d.specialty = 'genDentistry'
WHERE u.email = 'patient@denpoint.local'
  AND NOT EXISTS (
    SELECT 1
    FROM appointments a
    WHERE a.user_id = u.id
      AND a.dentist_id = d.id
      AND a.appointment_date = DATE_ADD(CURDATE(), INTERVAL 1 DAY)
      AND a.time = '10:00-11:30'
  );
