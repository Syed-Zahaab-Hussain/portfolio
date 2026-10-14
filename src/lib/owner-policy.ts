export const OWNER_ID = "portfolio-owner";

export function canAccessAdmin(
  session: { userId: string; expiresAt: Date },
  user: { id: string },
  now = new Date(),
) {
  return (
    session.userId === OWNER_ID &&
    user.id === OWNER_ID &&
    session.expiresAt > now
  );
}
