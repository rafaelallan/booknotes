--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.4 (Postgres.app)

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
-- Name: books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books (
    id integer NOT NULL,
    title text NOT NULL,
    summary text NOT NULL,
    actor text NOT NULL,
    isbn bigint NOT NULL
);


ALTER TABLE public.books OWNER TO postgres;

--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.books_id_seq OWNER TO postgres;

--
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
-- Name: notes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notes (
    id integer NOT NULL,
    date_read date,
    rating integer,
    notes text,
    book_id integer
);


ALTER TABLE public.notes OWNER TO postgres;

--
-- Name: notes_id_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notes_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notes_id_seq1 OWNER TO postgres;

--
-- Name: notes_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notes_id_seq1 OWNED BY public.notes.id;


--
-- Name: books id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- Name: notes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notes ALTER COLUMN id SET DEFAULT nextval('public.notes_id_seq1'::regclass);


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books (id, title, summary, actor, isbn) FROM stdin;
1	Harry Potter and The Cursed Child	It was always difficult being Harry Potter and it isn't much easier now that he is an overworked employee of the Ministry of Magic, a husband, and father of three school-age children. While Harry grapples with a past that refuses to stay where it belongs, his youngest son Albus must struggle with the weight of a family legacy he never wanted. As past and present fuse ominously, both father and son learn the uncomfortable truth: sometimes, darkness comes from unexpected places.	J. K. Rowling British author	9780751565362
2	A Game of Thrones	HBO's hit series A GAME OF THRONES is based on George R R Martin's internationally bestselling series A SONG OF ICE AND FIRE, the greatest fantasy epic of the modern age. A GAME OF THRONES is the first volume in the series. 'So vivid that you'll be hooked within a few pages' The Times Summers span decades. Winter can last a lifetime. And the struggle for the Iron Throne has begun. As Warden of the north, Lord Eddard Stark counts it a curse when King Robert bestows on him the office of the Hand. His honour weighs him down at court where a true man does what he will, not what he must . and a dead enemy is a thing of beauty. The old gods have no power in the south, Stark's family is split and there is treachery at court. Worse, the vengeance-mad heir of the deposed Dragon King has grown to maturity in exile in the Free Cities. He claims the Iron Throne.   	George R. R. Martin	9780007448036
3	Dracula	Regarded as one of the most influential horror stories of all time and the inspiration for countless literary spin-offs, the tale of the young Englishman Jonathan Harker's journey into the very heart of Count Dracula's evil realm remains a compelling read to this day. A thriller of hypnotic power, a dark exploration of human passion, mythology and the paranormal, and a plain old-fashioned masterpiece of storytelling, the nightmarish saga of Dracula is one of the enduring classics of supernatural fiction.	Bram Stoker	9781847494870
4	Honeymoon Affair TPB	Izzy is in the Caribbean on the honeymoon-that-isn't after her fiancé broke her heart. She's not looking for someone new. But when she meets Charles Miller, a successful writer holidaying alone, the electricity is undeniable. And what does she have to lose?\r\n\r\nIn Ireland, Charles's ex-wife and agent Ariel flits from party to party, glamorous and poised. She's always in touch with Charles. Though they're divorced, they're very close. Ariel wonders if they should get back together. She's an independent woman, but she liked being part of a power couple. And she's sure she only has to say, and they'll pick up where they left off.\r\n\r\nNo matter how in control of life you think you are, it can shock and surprise you. As Izzy, Ariel and Charles are about to find out . . . Sheila O'Flanagan's new novel tells a compelling and thought-provoking story about two strong women, one complicated man, and the secrets and dreams that draw them together - with explosive consequences . . .	Sheila O'Flanagan	9781035402892
5	Long Island TPB	A man with an Irish accent knocks on Eilis Fiorello’s door on Long Island and in that moment everything changes. Eilis and Tony have built a secure, happy life here since leaving Brooklyn - perhaps a little stifled by the in-laws so close, but twenty years married and with two children looking towards a good future.\r\n\r\nAnd yet this stranger will reveal something that will make Eilis question the life she has created. For the first time in years she suddenly feels very far from home and the revelation will see her turn towards Ireland once again. Back to her mother. Back to the town and the people she had chosen to leave behind. Did she make the wrong choice marrying Tony all those years ago? Is it too late now to take a different path?\r\n\r\nLong Island is Colm Tóibín’s masterpiece: an exquisite, exhilarating novel that asks whether it is possible to truly return to the past and renew the great love that seemed gone forever.	 Colm Tóibín	9781035029457
\.


--
-- Data for Name: notes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notes (id, date_read, rating, notes, book_id) FROM stdin;
\.


--
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.books_id_seq', 5, true);


--
-- Name: notes_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notes_id_seq1', 25, true);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: notes notes_pkey1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey1 PRIMARY KEY (id);


--
-- Name: notes notes_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id);


--
-- PostgreSQL database dump complete
--

