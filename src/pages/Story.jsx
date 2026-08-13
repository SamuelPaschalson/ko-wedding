import React from 'react';
import Plate from '../components/Plate';
import { story, plates, couple } from '../data/site';

/**
 * The signature page. Told as a broadsheet because the reception mood
 * board leans on "Sepia Romance" — old photographs, handwritten letters,
 * timeless romance. The newspaper treatment lives ONLY here; every other
 * page stays quiet so this one lands.
 */
export default function Story() {
  return (
    <>
      <section className="section section--tight">
        <div className="shell" style={{ textAlign: 'center', maxWidth: 720 }}>
          <p className="eyebrow reveal">Our Story</p>
          <h1 className="reveal" style={{ fontSize: 'clamp(34px, 6vw, 64px)', marginBlock: '12px 16px' }}>
            How we got here
          </h1>
          <p className="lede reveal" style={{ marginInline: 'auto' }}>
            We asked ourselves to write it down properly, so here it is, the way
            we would want it found, years from now, folded in a drawer.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell">
          <article className="chronicle reveal">
            <header className="chronicle-masthead">
              <h1>{story.masthead}</h1>
              <div className="chronicle-dateline">
                <span>{story.edition}</span>
                <span>{story.volume}</span>
                <span>{story.dateline}</span>
                <span>{story.price}</span>
              </div>
            </header>

            <h2 className="chronicle-headline">{story.headline}</h2>
            <p className="chronicle-standfirst">{story.standfirst}</p>

            <div className="chronicle-body">
              <figure className="chronicle-figure">
                <Plate src={plates.story} alt="The couple" flat label="Lead photograph" />
                <figcaption>{story.captions.lead}</figcaption>
              </figure>

              {story.columns.map((col) => (
                <div className="chronicle-col" key={col.kicker}>
                  <span className="chronicle-kicker">{col.kicker}</span>
                  {col.body.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              ))}

              <figure className="chronicle-figure">
                <Plate src={plates.storySmall} alt="The couple" flat label="Second photograph" />
                <figcaption>{story.captions.small}</figcaption>
              </figure>
            </div>

            <footer className="chronicle-foot">
              <span>{couple.hashtag}</span>
              <span>Printed with love in Lagos</span>
              <span>Continued, happily, on every page after this</span>
            </footer>
          </article>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="shell" style={{ textAlign: 'center', maxWidth: 660 }}>
          <p className="serif-note reveal">“{story.pullquote}”</p>
          <a className="btn btn--ghost reveal" href="#/wedding-day">
            See the day we planned
          </a>
        </div>
      </section>
    </>
  );
}
