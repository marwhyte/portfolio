import { PostData, getPosts } from '@/lib/posts';
import Card from '../components/card';
import { formatDate, formatViews } from '../utils';
import { H1 } from '../../components/h1';
import ReactCountryFlag from 'react-country-flag';
import { WorldMap } from '@/components/world-map';

const Post = ({ post }: { post: PostData }) => {
  return (
    <>
      <div className='h-3 absolute flex hidden w-3 -translate-x-[30.5px] translate-y-[11px] items-center justify-center rounded-full border border-gray-300 bg-white  dark:border-gray-400 dark:bg-gray-900 md:block' />
      <article className='md:grid md:grid-cols-4 md:items-baseline'>
        <Card className='md:col-span-3'>
          <div className='flex w-full justify-between'>
            <div>
              <Card.Title href={`/blog/${post.slug}`}>
                {post.countryCodes &&
                  post.countryCodes.map((countryCode) => (
                    <ReactCountryFlag
                      key={countryCode}
                      className='mr-2 inline'
                      countryCode={countryCode}
                      svg
                      style={{
                        marginTop: '-2px',
                        width: '1.2em',
                        height: '1.2em',
                      }}
                      title={countryCode}
                    />
                  ))}
                {post.title}
              </Card.Title>
            </div>
            <div className='-mt-9 md:-mt-1'>
              <Card.Category>{post.category}</Card.Category>

              <div className='mt-2 text-center'>
                <span className='relative z-10 text-xs !text-gray-400 dark:!text-gray-400'>
                  {formatViews(post.views)}
                </span>
              </div>
            </div>
          </div>
          <Card.Eyebrow as='time' dateTime={post.date} className='md:hidden'>
            {formatDate(post.date)}
          </Card.Eyebrow>
          <Card.Cta>Read post</Card.Cta>
        </Card>
        <Card.Eyebrow
          as='time'
          dateTime={post.date}
          className='hidden md:block'
        >
          {formatDate(post.date)}
        </Card.Eyebrow>
      </article>
    </>
  );
};

const Posts = ({ posts }: { posts: PostData[] }) => {
  return (
    <ul className='flex flex-col space-y-12 md:space-y-16 md:border-l md:border-gray-300 md:pl-6 md:dark:border-gray-100/40'>
      {posts.map((post) => (
        <li className='relative' key={post.slug}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
};

export default async function Blog() {
  const posts: PostData[] = await getPosts();

  // Creating hardcoded locations for all countries
  // Define coordinates for all countries
  const countryCoordinates: Record<string, { lat: number; lng: number }> = {
    // North America
    US: { lat: 35.7596, lng: -79.0193 }, // North Carolina
    CA: { lat: 56.1304, lng: -106.3468 },
    MX: { lat: 23.6345, lng: -102.5528 },
    CR: { lat: 9.7489, lng: -83.7534 }, // Costa Rica
    GT: { lat: 15.7835, lng: -90.2308 }, // Guatemala

    // Europe - adjusted coordinates to be more spread out
    UK: { lat: 54.7, lng: -3.5 },
    DE: { lat: 51.1, lng: 10.4 },
    FR: { lat: 46.5, lng: 2.7 },
    IT: { lat: 42.8, lng: 12.8 },
    ES: { lat: 40.0, lng: -4.0 },
    PT: { lat: 39.5, lng: -8.9 },
    NL: { lat: 52.3, lng: 5.5 },
    BE: { lat: 50.8, lng: 4.0 },
    PL: { lat: 52.0, lng: 19.0 },
    CH: { lat: 46.8, lng: 8.5 },
    IE: { lat: 53.0, lng: -8.0 },

    // Asia
    JP: { lat: 36.2048, lng: 138.2529 },
    TH: { lat: 15.87, lng: 100.9925 }, // Thailand
    VN: { lat: 14.0583, lng: 108.2772 }, // Vietnam

    // South America
    BR: { lat: -14.235, lng: -51.9253 },
    AR: { lat: -38.4161, lng: -63.6167 },
    CL: { lat: -35.6751, lng: -71.543 },
    CO: { lat: 4.5709, lng: -74.2973 }, // Colombia
    PE: { lat: -9.19, lng: -75.0152 }, // Peru
    BO: { lat: -16.2902, lng: -63.5887 }, // Bolivia
  };

  // Regional hubs
  const regionalHubs = {
    northAmerica: { lat: 35.7596, lng: -79.0193 }, // North Carolina as the main hub
    southAmerica: { lat: -10.0, lng: -55.0 }, // Central Brazil as South American hub
    europe: { lat: 48.0, lng: 8.0 }, // Central Europe hub
    asia: { lat: 25.0, lng: 110.0 }, // Central Asia hub
  };

  // Create connections for all countries we want to show
  const hardcodedConnections = [
    // European countries to Europe hub
    { start: countryCoordinates.UK, end: regionalHubs.europe },
    { start: countryCoordinates.DE, end: regionalHubs.europe },
    { start: countryCoordinates.FR, end: regionalHubs.europe },
    { start: countryCoordinates.IT, end: regionalHubs.europe },
    { start: countryCoordinates.ES, end: regionalHubs.europe },
    { start: countryCoordinates.PT, end: regionalHubs.europe },
    { start: countryCoordinates.NL, end: regionalHubs.europe },
    { start: countryCoordinates.BE, end: regionalHubs.europe },
    { start: countryCoordinates.PL, end: regionalHubs.europe },
    { start: countryCoordinates.CH, end: regionalHubs.europe },
    { start: countryCoordinates.IE, end: regionalHubs.europe },

    // Europe hub to North America
    { start: regionalHubs.europe, end: regionalHubs.northAmerica },

    // South American countries to South America hub
    { start: countryCoordinates.BR, end: regionalHubs.southAmerica },
    { start: countryCoordinates.AR, end: regionalHubs.southAmerica },
    { start: countryCoordinates.CL, end: regionalHubs.southAmerica },
    { start: countryCoordinates.CO, end: regionalHubs.southAmerica },
    { start: countryCoordinates.PE, end: regionalHubs.southAmerica },
    { start: countryCoordinates.BO, end: regionalHubs.southAmerica },

    // South America hub to North America
    { start: regionalHubs.southAmerica, end: regionalHubs.northAmerica },

    // Asian countries to Asia hub
    { start: countryCoordinates.JP, end: regionalHubs.asia },
    { start: countryCoordinates.TH, end: regionalHubs.asia },
    { start: countryCoordinates.VN, end: regionalHubs.asia },

    // Asia hub to North America
    { start: regionalHubs.asia, end: regionalHubs.northAmerica },

    // North American countries directly to North America hub (except US which is the hub)
    { start: countryCoordinates.CA, end: regionalHubs.northAmerica },
    { start: countryCoordinates.MX, end: regionalHubs.northAmerica },
    { start: countryCoordinates.CR, end: regionalHubs.northAmerica },
    { start: countryCoordinates.GT, end: regionalHubs.northAmerica },
  ];

  return (
    <div className='mb-24'>
      <div className='mb-16 text-center'>
        <H1>My Blog</H1>
        <p className='text-md mt-2'>
          Learn more about my projects, work and personal life.
        </p>

        {/* Add the WorldMap component */}
        <div className='mx-auto mb-16 mt-10 max-w-4xl'>
          <WorldMap
            dots={hardcodedConnections}
            lineColor='#3b82f6' // Adjust color to match your theme
          />
        </div>
      </div>
      <Posts posts={posts} />
    </div>
  );
}
