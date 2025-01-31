export enum Roles {
    admin,
    coding_admin,
    builder_admin,
    student_coder_lead,
    student_builder_lead,
    student_coder,
    student_builder,
    tester,
    LENGTH
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
