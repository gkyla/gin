export default async function () {
  const { getCurrentUser } = await useAuth();
  const currentUser = await getCurrentUser();

  return { currentUser };
}
