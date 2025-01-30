export enum Roles {
    admin = 0,
    coding_admin = 1,
    builder_admin = 2,
    student_coder_lead = 3,
    student_builder_lead = 4,
    student_coder = 5,
    student_builder = 6,
    __LENGTH
}

// TODO: Add all the features as we go along
export const Features = {
}

export type LoginType = {
    id: String,
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    message: String;
}

export type Userinfo = {
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    role: Number,
    features: String
}
