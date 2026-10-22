import { PEOPLE } from '@/lib/landing/content';
import type { PeopleFile } from '@/lib/landing/types';
import peopleJson from '@/public/landing-data/people.json';

const data = peopleJson as PeopleFile;

export default function People() {
  return (
    <section><div className="wrap">
      <div className="sec-head"><div className="eyebrow">{PEOPLE.eyebrow}</div><h2>{PEOPLE.title}</h2><p>{PEOPLE.text}</p></div>
      <div className="people">{data.people.map(p => <span key={p.name}><a href={PEOPLE.href} title={p.pub}>{p.name}</a></span>)}</div>
    </div></section>
  );
}
