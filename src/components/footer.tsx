import { useI18n } from '#/locales/client.ts'
import { Avatar, Text, Box, Flex, Section } from '@radix-ui/themes'

const footerLinks = [
  {
    text: 'Docs',
    href: 'https://docs.ethfollow.xyz',
  },
  /**
   * TODO: update with proper link
   */
  {
    text: 'Team',
    href: 'https://github.com/orgs/ethereumfollowprotocol/people',
  },
  {
    text: 'GitHub',
    href: 'https://github.com/ethereumfollowprotocol',
  },
  {
    text: 'X',
    href: 'https://x.com/ethfollowpr',
  },
  /**
   * TODO: add Discord link once we have one
   */
  {
    text: 'Discord',
    href: 'https://x.com/ethfollowpr',
  },
]

export function Footer() {
  const t = useI18n()

  return (
    <footer className='fixed bottom-0 mx-auto mt-4 h-60 w-full overflow-hidden font-sans'>
      <Flex
        direction={'row'}
        align={'center'}
        justify={'center'}
        width={'100%'}
        height={'100%'}
        className='space-x-28 bg-[#FEF305]'
      >
        <Section className='flex space-x-5 align-middle'>
          <Box className='my-auto'>
            <Text className='table-caption max-w-md text-4xl font-extrabold text-pink-400'>
              {t('APP_NAME.LONG')}
            </Text>
          </Box>
          <Avatar
            size={'9'}
            src='/assets/logo.png'
            fallback='EFP'
            className=''
          />
        </Section>
        <Section
          className='my-auto flex align-middle'
          p='0'
        >
          <ul className='my-auto flex flex-col space-y-1 text-center'>
            {footerLinks.map((route, index) => (
              <li
                className='inline font-extrabold'
                key={`route-${index}`}
              >
                <a
                  href={route.href}
                  className={`text-pink-400`}
                >
                  <span>{route.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </Flex>
    </footer>
  )
}
