/* eslint-disable react/jsx-key */
import React from 'react';

import NoteItem from '../NoteItem/NoteItem';
import type { Note } from '@/types/types';
import LoadingSpinner from '../UI/LoadingSpinner';

import styles from './NoteList.module.css';

type Props = {
  notesData: { username: string; notes: Note[] };
  pending: boolean;
  error: boolean;
  detailHandler: (
    content: string,
    title: string,
    key: string,
    url: string
  ) => void;
  createNoteHandler: () => void;
  isOpen: boolean;
};

const NoteList = ({
  notesData,
  pending,
  error,
  detailHandler,
  createNoteHandler,
  isOpen,
}: Props) => {
  const listClass = !isOpen ? `${styles.list}` : `${styles.none}`;

  return (
    <div className={listClass}>
      {!pending && (
        <div className={styles.create} onClick={createNoteHandler}>
          Create Note
        </div>
      )}
      {pending && <LoadingSpinner />}
      {!pending && <p>Hello {notesData.username}</p>}

      {!error && !pending && (
        <ul className={styles.ul}>
          {notesData.notes &&
            notesData.notes.map((note) => {
              return (
                <li key={note.id}>
                  <NoteItem
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    url={note.url}
                    content={note.note}
                    onClick={detailHandler}
                  />
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default NoteList;
