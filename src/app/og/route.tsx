// @ts-nocheck
import Image from 'next/image'
import { ImageResponse } from 'next/og'

// export async function GET({ params }: { params: { user: string } }) {
//   const user = params.user
//   console.log(params)

//   let fetchedUser = ''
//   let fetchedAvatar = '/public/assets/gradient-circle.svg'

//   try {
//     const response = await fetch(`https://api.ensdata.net/${user}`).then(res => res.json())
//     fetchedUser = response.error ? user : response.ens_primary
//     fetchedAvatar = response.avatar_url
//   } catch (err: unknown) {
//     fetchedUser = user
//   }

//   return new ImageResponse(
//     <div
//       style={{
//         height: '100%',
//         width: '100%',
//         display: 'flex',
//         textAlign: 'center',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexDirection: 'column',
//         flexWrap: 'nowrap',
//         backgroundColor: 'white',
//         backgroundImage:
//           'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
//         backgroundSize: '100px 100px'
//       }}
//     >
//       <div>
//         <img
//           src={fetchedAvatar}
//           alt={fetchedUser}
//           style={{
//             width: 80,
//             height: 80,
//             borderRadius: '100%'
//           }}
//         />
//         <p>{fetchedUser}</p>
//       </div>
//     </div>,
//     {
//       width: 800,
//       height: 418
//     }
//   )
// }

export async function GET(req) {
  const user = req.url.split('user=')[1]

  const response = await fetch(`https://api.ensdata.net/${user}`).then(res => res.json())
  const fetchedUser = response.error ? user : response.ens_primary
  const fetchedAvatar = response.avatar_url

  console.log(fetchedAvatar, fetchedUser)

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundImage: 'linear-gradient(to bottom, #fffcc0, #ffddf1)',
        fontSize: 60,
        letterSpacing: -2,
        fontWeight: 700,
        textAlign: 'center'
      }}
    >
      {/* <Image src={fetchedAvatar} alt={fetchedUser} width={100} height={100} /> */}
      <div>{fetchedAvatar}</div>
    </div>,
    {
      width: 800,
      height: 418
    }
  )
}
