export const host = "http://localhost:3000";

// User auth
export const userLoginRoute = `${host}/login`;
export const userSignupRoute = `${host}/signup`;

//User data
export const getUserDataRoute = (id) => `${host}/user/${id}`;

// Doctor auth
export const doctorLoginRoute = `${host}/doctor/login`;
export const doctorSignupRoute = `${host}/doctor/signup`;

// Doctor details
export const doctorDetailsRoute = `${host}/doctor/details`;
export const getDoctorDetailsRoute = (id) => `${host}/doctor/details/${id}`

// Appointment
export const appointmentRoute = `${host}/appointment`;

// Chat gpt api route
export const chatAiRoute = `${host}/completion`;