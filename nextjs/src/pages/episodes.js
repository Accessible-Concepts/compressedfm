import client from 'utils/client';
import groq from 'groq';
import { EpisodePage } from 'modules/episodes';
import { InteriorLayout } from 'modules/shared/layouts/InteriorLayout';

export default function Episodes({ episodes }) {
  return (
    <InteriorLayout>
      <EpisodePage episodes={episodes} />
    </InteriorLayout>
  );
}

export const AllEpisodesQuery = groq`*[_type == "episode" && published == true && publishedAt < now()] | order(episodeNumber desc) {
  _id,
  title,
  "cover": episodeCover.asset->url,
  episodeNumber,
  slug,
  publishedAt,
  briefDescription,
  audioPath
}`;

export async function getStaticProps({ params }) {
  const episodes = await client.fetch(AllEpisodesQuery);
  return {
    props: {
      episodes
    },
  }
}
