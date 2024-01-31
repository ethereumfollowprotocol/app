// import { type ProfileResponse } from '#/api/actions';
// import { createContext, useContext, useEffect, useState } from 'react';

// // Define the type for the profile context
// type EFPProfileContextType = {
//   profile: ProfileResponse | null;
//   isLoading: boolean;
//   error: Error | null;
// };

// type Props = {
//   children: React.ReactNode;
// };

// const EFPProfileContext = createContext<EFPProfileContextType | undefined>(undefined);

// export const EFPProfileProvider: React.FC<Props> = ({ children }) => {
//   const [profile, setProfile] = useState<ProfileResponse | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const fetchedProfile = await fetchProfile({ addressOrName: 'userAddressOrName' });
//         setProfile(fetchedProfile);
//       } catch (err: unknown) {
//         setError(err as Error | null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   return (
//     <EFPProfileContext.Provider value={{ profile, isLoading, error }}>
//       {children}
//     </EFPProfileContext.Provider>
//   );
// };

// export const useEFPProfile = (): EFPProfileContextType => {
//   const context = useContext(EFPProfileContext);
//   if (context === undefined) {
//     throw new Error('useEFPProfile must be used within an EFPProfileProvider');
//   }
//   return context;
// };
