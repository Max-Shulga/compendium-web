import { decodeAccessToken, requireToken } from '@/lib/auth/server';

import ProfileView from './_components/ProfileView/ProfileView';

const ProfilePage = async () => {
  const token = await requireToken();
  const { email, role } = decodeAccessToken(token);

  return <ProfileView email={email} role={role} />;
};

export default ProfilePage;
