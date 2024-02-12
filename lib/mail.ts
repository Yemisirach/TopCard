import { Resend } from "resend";

const resend = new Resend("re_P4drKrwi_LzZspPdDakAe8b9noXLXgqPx");

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "yemsrach3723@gmail.com",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "yemsrach3723@gmail.com",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "yemsrach3723@gmail.com",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

export const sendInvitationEmail = async (
  email: string,
  organizationId: string,
  boardId: string,
  token: string
) => {
  const invitationLink = `${domain}/invitation?organizationId=${organizationId}&boardId=${boardId}&token=${token}`;

  await resend.emails.send({
    from: "yemsrach3723@gmail.com",
    to: email,
    subject: "Invitation to join Board",
    html: `<p>You have been invited to join an Top Task management Board. Click <a href="${invitationLink}">here</a> to accept the invitation.</p>`,
  });
};

export const AdminsendInvitationEmail = async (
  email: string,
  organizationId: string,
  token: string
) => {
  const invitationLink = `${domain}/invitation?organizationId=${organizationId}&token=${token}`;

  await resend.emails.send({
    from: "yemsrach3723@gmail.com",
    to: email,
    subject: "Invitation to join Workspace",
    html: `<p>You have been invited to join an Workspace. Click <a href="${invitationLink}">here</a> to accept the invitation.</p>`,
  });
};
