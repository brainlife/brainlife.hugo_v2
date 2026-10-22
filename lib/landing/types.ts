/** Shapes shared by scripts/fetch-landing-data.mjs (writer) and features/LandingV3 (reader). */

export type { HeroVariant as HeroArt } from './pairs';

export interface Publication {
  id: string;            // slug of the DOI, used for thumbnail file names
  slug: string;          // connects.brainlife.io/publications/<slug>
  name: string;
  doi: string;
  date: string;          // YYYY-MM-DD
  tags: string[];
  desc: string;
  authors: string[];
  institutions: string[];
  url: string;
  video: string | null;  // first clip from groups[].videoPlaylist
  videos: number;
  viewers: number;       // groups[].viewerLinks (Neuroglancer views)
  banner: string | null; // pub.bannerImage as given by the API
  thumb: string | null;  // /landing-data/media/<id>.jpg, produced at build time
}

export interface Maintainer { name: string; institution: string }

export interface AppRecord {
  id: string;
  name: string;
  repo: string;          // GitHub owner/repo
  tags: string[];
  desc: string;
  runs: number;          // stats.requested
  users: number;         // stats.users
  maintainers: Maintainer[];
  avatar: string | null;
  thumb: string | null;
}

export interface Person { name: string; pub: string }

/** `count` is the total number of publications on the API; `pubs` is the subset the page renders. */
export interface PubsFile { fetched: string; count: number; pubs: Publication[] }
export interface AppsFile { fetched: string; apps: AppRecord[] }
export interface PeopleFile { fetched: string; people: Person[] }
