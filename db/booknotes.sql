PGDMP  $    9            	    |        	   booknotes    16.2    16.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24765 	   booknotes    DATABASE     k   CREATE DATABASE booknotes WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE booknotes;
                postgres    false            �            1259    24766    books    TABLE     �   CREATE TABLE public.books (
    id integer NOT NULL,
    title text NOT NULL,
    summary text NOT NULL,
    actor text NOT NULL,
    isbn bigint NOT NULL
);
    DROP TABLE public.books;
       public         heap    postgres    false            �            1259    24771    books_id_seq    SEQUENCE     �   CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.books_id_seq;
       public          postgres    false    215                       0    0    books_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;
          public          postgres    false    216            �            1259    24772    notes    TABLE     �   CREATE TABLE public.notes (
    id integer NOT NULL,
    date_read date,
    rating integer,
    notes text,
    book_id integer
);
    DROP TABLE public.notes;
       public         heap    postgres    false            �            1259    24777    notes_id_seq1    SEQUENCE     �   CREATE SEQUENCE public.notes_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.notes_id_seq1;
       public          postgres    false    217                       0    0    notes_id_seq1    SEQUENCE OWNED BY     >   ALTER SEQUENCE public.notes_id_seq1 OWNED BY public.notes.id;
          public          postgres    false    218            x           2604    24778    books id    DEFAULT     d   ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);
 7   ALTER TABLE public.books ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            y           2604    24779    notes id    DEFAULT     e   ALTER TABLE ONLY public.notes ALTER COLUMN id SET DEFAULT nextval('public.notes_id_seq1'::regclass);
 7   ALTER TABLE public.notes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217                      0    24766    books 
   TABLE DATA           @   COPY public.books (id, title, summary, actor, isbn) FROM stdin;
    public          postgres    false    215   �                 0    24772    notes 
   TABLE DATA           F   COPY public.notes (id, date_read, rating, notes, book_id) FROM stdin;
    public          postgres    false    217   �                  0    0    books_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.books_id_seq', 7, true);
          public          postgres    false    216                       0    0    notes_id_seq1    SEQUENCE SET     <   SELECT pg_catalog.setval('public.notes_id_seq1', 39, true);
          public          postgres    false    218            {           2606    24781    books books_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.books DROP CONSTRAINT books_pkey;
       public            postgres    false    215            }           2606    24783    notes notes_pkey1 
   CONSTRAINT     O   ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey1 PRIMARY KEY (id);
 ;   ALTER TABLE ONLY public.notes DROP CONSTRAINT notes_pkey1;
       public            postgres    false    217            ~           2606    24784    notes notes_book_id_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id);
 B   ALTER TABLE ONLY public.notes DROP CONSTRAINT notes_book_id_fkey;
       public          postgres    false    3451    215    217                  x������ � �            x������ � �     