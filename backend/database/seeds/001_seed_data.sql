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
ON CONFLICT (email) DO UPDATE SET
  firstname = EXCLUDED.firstname,
  lastname = EXCLUDED.lastname,
  phone_number = EXCLUDED.phone_number,
  role = EXCLUDED.role;

WITH maria_keep AS (
  SELECT MIN(id) AS id
  FROM dentists
  WHERE full_name = 'Dr. Maria Santos'
    AND specialty = 'genDentistry'
),
duplicate_maria AS (
  SELECT id
  FROM dentists
  WHERE full_name = 'Dr. Maria Santos'
    AND specialty = 'genDentistry'
    AND id <> (SELECT id FROM maria_keep)
)
UPDATE appointments
SET dentist_id = (SELECT id FROM maria_keep)
WHERE dentist_id IN (SELECT id FROM duplicate_maria);

DELETE FROM dentists
WHERE full_name = 'Dr. Maria Santos'
  AND specialty = 'genDentistry'
  AND id <> (
    SELECT COALESCE(MIN(id), -1)
    FROM dentists
    WHERE full_name = 'Dr. Maria Santos'
      AND specialty = 'genDentistry'
  );

INSERT INTO dentists (full_name, specialty, time)
VALUES
  ('Dr. Maria Santos', 'genDentistry', '10:00-11:30'),
  ('Dr. Paolo Reyes', 'periodontics', '14:30-16:30'),
  ('Dr. Andrea Cruz', 'OSID', '10:00-11:30'),
  ('Dr. Miguel Navarro', 'OCA', '16:30-18:00'),
  ('Dr. Sophia Lim', 'prosthodontics', '13:00-14:30')
ON CONFLICT (full_name, specialty, time) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  specialty = EXCLUDED.specialty,
  time = EXCLUDED.time;

INSERT INTO appointments (user_id, dentist_id, appointment_date, status, concern, time, typeofservice)
SELECT
  u.id,
  d.id,
  CURRENT_DATE + INTERVAL '1 day',
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
      AND a.appointment_date = CURRENT_DATE + INTERVAL '1 day'
      AND a.time = '10:00-11:30'
  );
