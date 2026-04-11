import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mycorp-frontend.vercel.app';
  
  // Explicitly defining routes gives you granular SEO control
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0, // Highest priority (Home)
    },
    {
      url: `${baseUrl}/sectors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, // High priority (Core Business)
    },
    {
      url: `${baseUrl}/subsidiaries`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9, // High priority (Core Business)
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8, // Medium priority
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7, // Medium-low priority
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5, // Lowest priority (Static content)
    },
  ];
}