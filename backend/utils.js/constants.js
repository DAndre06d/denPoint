export const emailReminder =(firstname, appointment_date, time)=>{
    return `
        Dear ${firstname},

        We hope this message finds you well.

        This is a friendly reminder about your upcoming appointment with us. Here are the details:

        **Appointment Date:** ${appointment_date}
        **Time:** ${time}

        Please make sure to arrive a few minutes early to complete any necessary paperwork. If you need to reschedule or have any questions, feel free to contact us at [Your Contact Number] or reply to this email.

        Thank you for choosing our practice. We look forward to seeing you soon!

        Best regards,
        Den.Point Clinic
`
} 
