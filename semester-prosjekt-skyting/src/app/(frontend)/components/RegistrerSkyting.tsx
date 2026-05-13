'use client';

import Link from 'next/link';
import { Fragment, useState } from 'react';
import type { Event } from '@/payload-types';

type PostScore = {
  treff: number;
  inner: number;
};

type Shooter = {
  id: number;
  lag: number;
  standplass: number;
  nr: number;
  navn: string;
  klasse: string;
  posts: PostScore[];
  sf1: number;
  sf2: number;
};

const MAX_TREFF_PER_POST = 5;
const TREFF_POENG = 3;
const INNER_POENG = 5;

export default function RegistrerSkyting({ event }: { event: Event }) {
  const postCount = event.rounds || 6;

  const createPosts = () =>
    Array.from({ length: postCount }, () => ({
      treff: 0,
      inner: 0,
    }));

  const [currentLag, setCurrentLag] = useState(1);

  const [shooters, setShooters] = useState<Shooter[]>([
    {
      id: 1,
      lag: 1,
      standplass: 1,
      nr: 1,
      navn: 'Startnr 1',
      klasse: '',
      posts: createPosts(),
      sf1: 0,
      sf2: 0,
    },
  ]);

  const formattedDate = new Date(event.date).toLocaleDateString('nb-NO');
  const maxLag = 180;

  const lagShooters = shooters.filter((shooter) => shooter.lag === currentLag);

  function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value || 0));
  }

  function calculatePost(post: PostScore) {
    const vanligeTreff = post.treff - post.inner;
    return vanligeTreff * TREFF_POENG + post.inner * INNER_POENG;
  }

  function calculateSum(shooter: Shooter) {
    return shooter.posts.reduce((sum, post) => sum + calculatePost(post), 0);
  }

  function ensureLagExists(lag: number) {
    const lagExists = shooters.some((shooter) => shooter.lag === lag);

    if (lagExists) return;

    setShooters((prev) => [
      ...prev,
      {
        id: Date.now(),
        lag,
        standplass: 1,
        nr: lag,
        navn: `Startnr ${lag}`,
        klasse: '',
        posts: createPosts(),
        sf1: 0,
        sf2: 0,
      },
    ]);
  }

  function updatePost(
    shooterId: number,
    postIndex: number,
    field: keyof PostScore,
    rawValue: number,
  ) {
    setShooters((prev) =>
      prev.map((shooter) => {
        if (shooter.id !== shooterId) return shooter;

        const posts = shooter.posts.map((post, index) => {
          if (index !== postIndex) return post;

          if (field === 'treff') {
            const treff = clamp(rawValue, 0, MAX_TREFF_PER_POST);
            const inner = clamp(post.inner, 0, treff);

            return { treff, inner };
          }

          const inner = clamp(rawValue, 0, post.treff);

          return {
            ...post,
            inner,
          };
        });

        return {
          ...shooter,
          posts,
        };
      }),
    );
  }

  function updateShooter(
    shooterId: number,
    field: keyof Shooter,
    value: string | number,
  ) {
    setShooters((prev) =>
      prev.map((shooter) =>
        shooter.id === shooterId
          ? {
              ...shooter,
              [field]: value,
            }
          : shooter,
      ),
    );
  }

  function addShooter() {
    const nextNr = shooters.length + 1;

    setShooters((prev) => [
      ...prev,
      {
        id: Date.now(),
        lag: currentLag,
        standplass: lagShooters.length + 1,
        nr: nextNr,
        navn: `Startnr ${nextNr}`,
        klasse: '',
        posts: createPosts(),
        sf1: 0,
        sf2: 0,
      },
    ]);
  }

  function removeShooter(id: number) {
    if (shooters.length === 1) return;

    setShooters((prev) => prev.filter((shooter) => shooter.id !== id));
  }

  async function saveResults() {
    const shootersToSave = shooters.map((shooter) => ({
      ...shooter,
      total: calculateSum(shooter),
    }));

    const res = await fetch('/save-results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId: event.id,
        shooters: shootersToSave,
      }),
    });

    if (!res.ok) {
      alert('Kunne ikke lagre resultater.');
      return;
    }

    alert('Resultater lagret.');
  }

  return (
    <main className="register-dark-page">
      <div className="register-card original-card">
        <div className="register-top">
          <div>
            <h1>Avholde stevne innledende</h1>

            <p>
              {event.id} - {event.name}
            </p>

            <p className="small-text">
              Tidspunkt for skytterlaget: {formattedDate} 01:00
            </p>
          </div>

          <Link href={`/convention/${event.id}`} className="blue-button">
            Tilbake
          </Link>
        </div>

        <div className="score-help">
          Treff gir 3 poeng. Inner gir 5 poeng. Maks 5 treff per post.
        </div>

        <div className="table-scroll">
          <table className="dark-score-table original-table">
            <thead>
              <tr>
                <Th>
                  L
                  <br />3
                </Th>
                <Th>S</Th>
                <Th>Nr</Th>
                <Th>Skytter</Th>
                <Th></Th>
                <Th>Klasse</Th>

                {Array.from({ length: postCount }).map((_, index) => (
                  <Fragment key={`header-post-${index}`}>
                    <Th>{index + 1}</Th>
                    <Th>{index + 1} I</Th>
                  </Fragment>
                ))}

                <Th>Sum</Th>
                <Th>SF 1</Th>
                <Th>SF 2</Th>
              </tr>
            </thead>

            <tbody>
              {lagShooters.map((shooter) => {
                const sum = calculateSum(shooter);

                return (
                  <tr key={shooter.id}>
                    <Td>{shooter.lag}</Td>
                    <Td>{shooter.standplass}</Td>
                    <Td>{shooter.nr}</Td>

                    <Td>
                      <input
                        value={shooter.navn}
                        onChange={(e) =>
                          updateShooter(shooter.id, 'navn', e.target.value)
                        }
                        className="name-input"
                      />
                    </Td>

                    <Td>
                      <div className="table-actions">
                        <button
                          type="button"
                          onClick={addShooter}
                          className="small-blue-button"
                        >
                          +
                        </button>

                        <button
                          type="button"
                          onClick={() => removeShooter(shooter.id)}
                          className="small-red-button"
                        >
                          ×
                        </button>
                      </div>
                    </Td>

                    <Td>
                      <input
                        value={shooter.klasse}
                        onChange={(e) =>
                          updateShooter(shooter.id, 'klasse', e.target.value)
                        }
                        className="class-input"
                      />
                    </Td>

                    {shooter.posts.map((post, index) => (
                      <Fragment key={`score-post-${shooter.id}-${index}`}>
                        <Td>
                          <input
                            type="number"
                            min={0}
                            max={5}
                            value={post.treff}
                            onChange={(e) =>
                              updatePost(
                                shooter.id,
                                index,
                                'treff',
                                Number(e.target.value),
                              )
                            }
                          />
                        </Td>

                        <Td>
                          <input
                            type="number"
                            min={0}
                            max={post.treff}
                            value={post.inner}
                            onChange={(e) =>
                              updatePost(
                                shooter.id,
                                index,
                                'inner',
                                Number(e.target.value),
                              )
                            }
                          />
                        </Td>
                      </Fragment>
                    ))}

                    <Td>
                      <strong>{sum}</strong>
                    </Td>

                    <Td>
                      <input
                        type="number"
                        value={shooter.sf1}
                        onChange={(e) =>
                          updateShooter(
                            shooter.id,
                            'sf1',
                            Number(e.target.value),
                          )
                        }
                      />
                    </Td>

                    <Td>
                      <input
                        type="number"
                        value={shooter.sf2}
                        onChange={(e) =>
                          updateShooter(
                            shooter.id,
                            'sf2',
                            Number(e.target.value),
                          )
                        }
                      />
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="register-controls">
          <button
            type="button"
            onClick={() => {
              const newLag = Math.max(currentLag - 1, 1);
              setCurrentLag(newLag);
              ensureLagExists(newLag);
            }}
          >
            ←
          </button>

          <span>
            Lag {currentLag} av {maxLag}
          </span>

          <button
            type="button"
            onClick={() => {
              const newLag = Math.min(currentLag + 1, maxLag);
              setCurrentLag(newLag);
              ensureLagExists(newLag);
            }}
          >
            →
          </button>

          <label>Velg lag</label>

          <select
            value={currentLag}
            onChange={(e) => {
              const newLag = Number(e.target.value);
              setCurrentLag(newLag);
              ensureLagExists(newLag);
            }}
          >
            {Array.from({ length: maxLag }).map((_, index) => (
              <option key={index + 1} value={index + 1}>
                Lag {index + 1}
              </option>
            ))}
          </select>

          <button type="button" onClick={saveResults} className="green-button">
            Lagre
          </button>
        </div>
      </div>
    </main>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return <th>{children}</th>;
}

function Td({ children }: { children?: React.ReactNode }) {
  return <td>{children}</td>;
}