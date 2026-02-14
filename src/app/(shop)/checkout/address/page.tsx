import { auth } from '@/auth';
import { getCountries, getUserAddress } from '@/src/actions';
import { Title } from '@/src/components';
import { AddressForm } from './ui/AddressForm';

export default async function AddressPage() {
  const session = await auth();
  const userId = session!.user.id;
  const countries = await getCountries();
  const userStoredAddress = (await getUserAddress(userId)) ?? undefined;

  return (
    <div
      className="mb-72 flex flex-col px-10 sm:items-center sm:justify-center
        sm:px-0"
    >
      <div
        className="flex w-full flex-col justify-center text-left xl:w-[1000px]"
      >
        <Title title="Dirección" subtitle="Dirección de entrega" />
        <AddressForm
          countries={countries}
          userId={userId}
          userStoredAddress={userStoredAddress}
        />
      </div>
    </div>
  );
}
