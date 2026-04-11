import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://mycorp-frontend.vercel.app'

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/sectors/', '/careers', '/contact', '/subsidiaries'],
      disallow: [
        '/admin', 
        '/admin/', 
        '/dashboard', 
        '/dashboard/', 
        '/auth/login', 
        '/auth/signup'
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}