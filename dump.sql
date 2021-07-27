--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: genres; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.genres (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: genres_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: genres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.genres_id_seq OWNED BY public.genres.id;


--
-- Name: songs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.songs (
    id integer NOT NULL,
    name text,
    url text,
    score integer
);


--
-- Name: songs_genres; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.songs_genres (
    id integer NOT NULL,
    "songId" integer NOT NULL,
    "genreId" integer NOT NULL
);


--
-- Name: songs_genres_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.songs_genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: songs_genres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.songs_genres_id_seq OWNED BY public.songs_genres.id;


--
-- Name: songs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.songs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: songs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.songs_id_seq OWNED BY public.songs.id;


--
-- Name: genres id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genres ALTER COLUMN id SET DEFAULT nextval('public.genres_id_seq'::regclass);


--
-- Name: songs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songs ALTER COLUMN id SET DEFAULT nextval('public.songs_id_seq'::regclass);


--
-- Name: songs_genres id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songs_genres ALTER COLUMN id SET DEFAULT nextval('public.songs_genres_id_seq'::regclass);


--
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.genres VALUES (1, 'Rap');
INSERT INTO public.genres VALUES (7, 'Rock');
INSERT INTO public.genres VALUES (8, 'Samba');
INSERT INTO public.genres VALUES (9, 'Reggae');
INSERT INTO public.genres VALUES (10, 'Funk');


--
-- Data for Name: songs; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.songs VALUES (1, 'Smells like teen spirit', 'http://www.youtube.com/123456', 0);
INSERT INTO public.songs VALUES (2, 'Smells like teen spirit', 'http://www.youtube.com/123456', 0);
INSERT INTO public.songs VALUES (3, 'Que nem o meu cachorro - Black Alien', 'http://www.youtube.com/123456', 0);
INSERT INTO public.songs VALUES (4, 'Que nem o meu cachorro - Black Alien', 'http://www.youtube.com/123456', 0);
INSERT INTO public.songs VALUES (5, 'Que nem o meu cachorro - Black Alien', 'http://www.youtube.com/123456', 0);
INSERT INTO public.songs VALUES (6, 'Que nem o meu cachorro - Black Alien', 'http://www.youtube.com/123456', 0);
INSERT INTO public.songs VALUES (7, 'Que nem o meu cachorro - Black Alien', 'http://www.youtube.com/123456', 0);
INSERT INTO public.songs VALUES (8, 'Que nem o meu cachorro - Black Alien', 'http://www.youtube.com/123456', 0);
INSERT INTO public.songs VALUES (9, 'Que nem o meu cachorro - Black Alien', 'http://www.youtube.com/123456', 0);


--
-- Data for Name: songs_genres; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.songs_genres VALUES (1, 8, 1);
INSERT INTO public.songs_genres VALUES (2, 8, 7);
INSERT INTO public.songs_genres VALUES (3, 9, 1);
INSERT INTO public.songs_genres VALUES (4, 9, 7);


--
-- Name: genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.genres_id_seq', 10, true);


--
-- Name: songs_genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.songs_genres_id_seq', 4, true);


--
-- Name: songs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.songs_id_seq', 9, true);


--
-- Name: genres genres_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_name_key UNIQUE (name);


--
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id);


--
-- Name: songs_genres songs_genres_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songs_genres
    ADD CONSTRAINT songs_genres_pkey PRIMARY KEY (id);


--
-- Name: songs songs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_pkey PRIMARY KEY (id);


--
-- Name: songs_genres songs_genres_genreId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songs_genres
    ADD CONSTRAINT "songs_genres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES public.genres(id);


--
-- Name: songs_genres songs_genres_songId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songs_genres
    ADD CONSTRAINT "songs_genres_songId_fkey" FOREIGN KEY ("songId") REFERENCES public.songs(id);


--
-- PostgreSQL database dump complete
--

