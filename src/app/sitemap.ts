import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mycorp-frontend.vercel.app'
  
  // Define your static routes
  const routes = [
    '',
    '/careers',
    '/contact',
    '/subsidiaries',
    '/sectors',
    '/about',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8, // Home page is priority 1
  }))

  return [...routes]
}