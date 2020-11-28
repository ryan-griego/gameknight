--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

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

ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.carts DROP CONSTRAINT IF EXISTS carts_pkey;
ALTER TABLE IF EXISTS ONLY public."cartItems" DROP CONSTRAINT IF EXISTS "cartItems_pkey";
ALTER TABLE IF EXISTS public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE IF EXISTS public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE IF EXISTS public."products_productId_seq";
DROP TABLE IF EXISTS public.products;
DROP SEQUENCE IF EXISTS public."orders_orderId_seq";
DROP TABLE IF EXISTS public.orders;
DROP SEQUENCE IF EXISTS public."carts_cartId_seq";
DROP TABLE IF EXISTS public.carts;
DROP SEQUENCE IF EXISTS public."cartItems_cartItemId_seq";
DROP TABLE IF EXISTS public."cartItems";
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL,
    players text,
    mins integer,
    ages text
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
1	1	3	2900
2	1	2	2595
3	1	2	2595
4	1	2	2595
5	1	2	2595
6	1	3	2900
7	1	4	999
8	1	4	999
9	2	4	999
10	3	4	999
11	3	4	999
12	3	4	999
13	3	4	999
14	3	4	999
15	3	1	2999
16	3	1	2999
17	3	1	2999
18	3	1	2999
19	3	1	2999
20	3	1	2999
21	3	1	2999
22	4	1	2999
23	4	3	2900
24	4	3	2900
25	4	3	2900
26	4	3	2900
27	4	3	2900
28	4	3	2900
29	4	3	2900
30	4	3	2900
31	4	2	2595
32	4	4	999
33	5	3	2900
34	5	2	2595
35	5	6	830
36	5	6	830
37	5	6	830
100	6	6	830
101	6	4	999
102	7	1	2999
103	7	1	2999
104	8	3	2900
105	8	4	999
106	9	4	999
107	10	1	2999
108	10	1	2999
109	11	1	2999
110	11	1	2999
111	11	3	2900
112	11	6	830
113	12	6	830
114	12	6	830
115	12	6	830
116	12	6	830
117	12	6	830
118	12	6	830
119	12	4	999
120	12	4	999
121	12	4	999
122	12	6	830
123	12	5	9900
124	12	4	999
125	12	4	999
126	12	1	2999
127	12	1	2999
128	13	5	9900
129	14	1	2999
130	14	6	830
131	15	1	2999
132	15	6	830
133	16	4	999
134	16	6	830
135	16	5	9900
136	17	5	9900
137	18	5	9900
138	19	5	9900
139	20	6	830
140	20	5	9900
141	21	4	999
142	22	2	2595
143	23	3	2900
144	23	3	2900
145	24	2	2595
146	24	2	2595
147	24	5	9900
148	25	2	2595
149	25	2	2595
150	24	3	2900
151	26	2	2595
152	26	2	2595
153	27	5	9900
154	27	2	2595
155	27	2	2595
156	27	2	2595
157	27	2	2595
158	27	2	2595
159	27	2	2595
160	27	5	9900
161	28	3	2900
162	28	2	2595
163	28	3	2900
164	28	3	2900
165	28	3	2900
166	28	3	2900
167	28	3	2900
168	28	3	2900
169	28	3	2900
170	28	3	2900
171	28	3	2900
172	28	3	2900
173	28	3	2900
174	28	3	2900
175	28	3	2900
176	28	3	2900
177	28	3	2900
178	28	3	2900
179	28	3	2900
180	28	3	2900
181	28	3	2900
182	28	3	2900
183	28	3	2900
184	28	3	2900
185	28	3	2900
186	28	3	2900
187	28	3	2900
188	28	3	2900
189	28	3	2900
190	28	3	2900
191	28	3	2900
192	28	3	2900
193	28	3	2900
194	28	3	2900
195	28	3	2900
196	28	3	2900
197	28	3	2900
198	28	3	2900
199	28	3	2900
200	28	3	2900
201	28	3	2900
202	28	3	2900
203	28	5	9900
204	28	5	9900
205	28	6	830
206	28	6	830
207	28	6	830
208	28	6	830
209	28	6	830
210	28	6	830
211	28	3	2900
212	28	3	2900
213	28	3	2900
214	28	3	2900
215	29	3	2900
216	29	3	2900
217	29	3	2900
218	29	3	2900
219	29	3	2900
220	29	3	2900
221	29	3	2900
222	29	3	2900
223	30	3	2900
224	30	1	2999
225	30	5	9900
226	30	3	2900
227	31	6	830
228	32	6	830
229	32	3	2900
230	32	3	2900
231	32	4	999
232	32	4	999
233	32	4	999
234	33	1	2999
235	34	1	2999
236	35	1	2999
237	36	1	2999
238	37	1	2999
340	38	2	2595
349	41	3	2900
351	43	3	2900
353	43	5	9900
355	43	5	9900
356	43	5	9900
357	43	5	9900
358	43	5	9900
338	38	2	2595
341	38	3	2900
705	63	3	4399
344	39	3	2900
346	39	3	2900
348	40	3	2900
350	42	3	2900
352	43	5	9900
354	43	5	9900
359	43	3	2900
360	43	3	2900
706	63	5	1399
707	64	3	4399
708	65	3	4399
709	66	3	4399
710	67	2	3199
711	68	2	3199
712	68	2	3199
713	69	4	999
714	70	1	5399
715	70	1	5399
716	70	1	5399
372	44	3	2900
373	44	5	9900
374	44	6	830
375	45	3	2900
376	46	6	830
377	47	6	830
378	48	6	830
379	49	6	830
380	49	6	830
381	49	6	830
382	50	3	2900
383	51	3	2900
717	71	5	1399
718	71	5	1399
719	72	1	5399
720	73	2	3199
721	73	2	3199
722	73	2	3199
390	52	5	9900
391	52	5	9900
392	52	5	9900
393	52	5	9900
394	52	5	9900
395	52	5	9900
396	52	4	999
397	52	4	999
398	52	4	999
399	53	3	2900
400	55	3	2900
401	54	3	2900
535	57	6	1899
536	57	6	1899
723	74	2	3199
724	74	2	3199
725	74	2	3199
726	75	2	3199
409	56	5	9900
410	56	5	9900
413	56	3	2900
545	57	6	1899
546	57	6	1899
417	56	6	1899
418	56	6	1899
419	56	6	1899
420	56	6	1899
421	56	6	1899
422	56	6	1899
547	57	6	1899
734	76	2	3199
735	76	2	3199
736	76	2	3199
737	76	2	3199
336	38	2	2595
738	77	2	3199
432	56	1	5399
433	56	3	4399
434	56	3	4399
435	56	3	4399
436	56	3	4399
437	56	3	4399
438	56	3	4399
439	56	3	4399
440	56	3	4399
441	56	3	4399
442	56	3	4399
443	56	3	4399
444	56	3	4399
445	56	3	4399
446	56	3	4399
447	56	3	4399
448	56	3	4399
748	78	2	3199
753	79	5	1399
754	79	5	1399
755	79	5	1399
756	79	5	1399
574	57	2	3199
575	57	2	3199
576	57	6	1899
577	57	6	1899
578	57	6	1899
579	57	6	1899
580	57	6	1899
581	57	2	3199
757	79	3	4399
758	80	2	3199
759	80	2	3199
760	81	2	3199
761	82	2	3199
762	81	4	999
765	81	1	5399
610	58	2	3199
611	58	2	3199
612	58	2	3199
613	58	2	3199
614	58	2	3199
615	58	2	3199
616	58	5	1399
617	59	6	1899
619	60	1	5399
624	60	1	5399
625	60	1	5399
626	60	2	3199
627	60	2	3199
628	60	1	5399
629	60	1	5399
630	60	1	5399
631	60	1	5399
632	60	1	5399
633	60	1	5399
634	60	1	5399
635	60	1	5399
636	60	2	3199
638	60	2	3199
640	60	1	5399
641	60	1	5399
642	60	1	5399
643	60	1	5399
647	61	6	1899
649	61	5	1399
661	61	1	5399
662	61	1	5399
663	61	1	5399
664	61	1	5399
665	61	1	5399
666	61	1	5399
667	61	1	5399
668	61	1	5399
669	61	2	3199
670	61	2	3199
671	61	2	3199
672	61	2	3199
673	61	1	5399
674	61	1	5399
675	61	1	5399
676	61	1	5399
677	61	4	999
678	61	2	3199
679	61	2	3199
680	61	2	3199
681	61	1	5399
682	61	1	5399
683	62	6	1899
684	62	2	3199
685	62	6	1899
686	62	6	1899
687	62	6	1899
688	62	2	3199
689	62	2	3199
690	62	2	3199
691	62	2	3199
692	62	2	3199
693	62	2	3199
694	62	2	3199
695	62	2	3199
766	81	1	5399
767	81	1	5399
768	81	2	3199
769	81	1	5399
770	81	2	3199
771	81	1	5399
772	81	2	3199
773	81	1	5399
774	81	1	5399
775	81	2	3199
776	81	2	3199
777	81	2	3199
778	81	2	3199
779	81	1	5399
780	81	1	5399
781	81	1	5399
782	81	1	5399
783	81	1	5399
784	81	2	3199
789	81	2	3199
790	81	3	4399
791	81	2	3199
792	81	3	4399
793	81	1	5399
794	81	2	3199
795	81	2	3199
796	81	2	3199
797	81	2	3199
798	81	2	3199
799	81	2	3199
800	81	2	3199
801	81	2	3199
802	81	2	3199
803	81	3	4399
804	81	3	4399
805	81	3	4399
806	81	3	4399
807	81	3	4399
808	81	3	4399
809	81	3	4399
810	81	2	3199
811	81	2	3199
812	81	2	3199
813	81	2	3199
814	81	2	3199
815	81	2	3199
816	81	2	3199
817	81	2	3199
818	81	1	5399
819	81	1	5399
820	81	3	4399
821	81	3	4399
822	81	2	3199
823	81	2	3199
824	81	2	3199
825	81	2	3199
826	81	1	5399
827	81	3	4399
828	81	2	3199
829	81	2	3199
830	81	2	3199
831	81	2	3199
832	81	1	5399
833	81	1	5399
834	81	1	5399
835	81	1	5399
836	81	4	999
837	81	4	999
838	81	2	3199
839	81	6	1899
840	81	6	1899
841	81	6	1899
842	83	2	3199
843	84	2	3199
844	84	3	4399
845	84	3	4399
846	84	1	5399
847	84	1	5399
848	84	5	1399
849	84	5	1399
850	84	3	4399
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
1	2020-09-16 23:54:13.182888+00
2	2020-09-17 03:16:53.393917+00
3	2020-09-17 18:58:53.315609+00
4	2020-09-17 20:41:50.656329+00
5	2020-09-18 18:13:25.868812+00
6	2020-09-19 17:26:07.635056+00
7	2020-09-22 02:23:24.387969+00
8	2020-09-22 20:53:30.242161+00
9	2020-09-22 21:21:51.350903+00
10	2020-10-26 19:50:36.225826+00
11	2020-10-26 20:23:20.199692+00
12	2020-10-26 20:38:19.878357+00
13	2020-10-26 20:56:41.624637+00
14	2020-10-26 20:56:59.679704+00
15	2020-10-27 02:54:39.27643+00
16	2020-10-27 03:31:00.21491+00
17	2020-10-27 07:51:31.527564+00
18	2020-10-27 07:52:42.367669+00
19	2020-10-27 07:53:32.928789+00
20	2020-10-27 07:57:49.547777+00
21	2020-10-27 08:09:09.757273+00
22	2020-10-27 18:25:11.741117+00
23	2020-10-27 18:29:23.423884+00
24	2020-10-27 19:50:22.252924+00
25	2020-10-27 19:53:22.784625+00
26	2020-10-27 22:21:30.62268+00
27	2020-10-27 23:43:03.823649+00
28	2020-10-28 00:16:12.624293+00
29	2020-10-28 03:48:17.802963+00
30	2020-10-28 15:02:25.909837+00
31	2020-10-28 15:23:03.707961+00
32	2020-10-28 15:23:45.402587+00
33	2020-10-28 15:27:47.696684+00
34	2020-10-28 15:27:47.697218+00
35	2020-10-28 15:27:47.701688+00
36	2020-10-28 15:27:47.702043+00
37	2020-10-28 15:27:47.708848+00
38	2020-10-28 15:27:47.713483+00
39	2020-10-28 23:14:50.358067+00
40	2020-10-28 23:17:03.529594+00
41	2020-10-28 23:17:03.533302+00
42	2020-10-28 23:17:03.535892+00
43	2020-10-28 23:17:03.538627+00
44	2020-10-28 23:19:48.774197+00
45	2020-10-29 00:18:45.828649+00
46	2020-10-29 00:20:34.232128+00
47	2020-10-29 00:20:34.23437+00
48	2020-10-29 00:20:34.236103+00
49	2020-10-29 00:20:34.237003+00
50	2020-10-29 00:22:58.394362+00
51	2020-10-29 00:22:58.39763+00
52	2020-10-29 00:22:58.403365+00
53	2020-10-29 02:13:00.444915+00
54	2020-10-29 02:13:00.445333+00
55	2020-10-29 02:13:00.445829+00
56	2020-10-29 02:13:00.449001+00
57	2020-10-29 18:32:59.21273+00
58	2020-10-30 17:02:57.169888+00
59	2020-10-30 19:47:17.272563+00
60	2020-10-30 19:47:17.276072+00
61	2020-10-30 20:19:38.616082+00
62	2020-10-30 23:26:25.833142+00
63	2020-10-31 18:59:30.790473+00
64	2020-10-31 22:28:03.312852+00
65	2020-10-31 22:33:50.470057+00
66	2020-10-31 22:35:52.9398+00
67	2020-10-31 22:36:16.819119+00
68	2020-10-31 22:45:22.931545+00
69	2020-10-31 22:45:58.671515+00
70	2020-10-31 22:53:03.956209+00
71	2020-10-31 22:55:51.158177+00
72	2020-11-04 23:04:48.144029+00
73	2020-11-09 23:52:22.02262+00
74	2020-11-09 23:58:50.567017+00
75	2020-11-10 00:20:53.95793+00
76	2020-11-10 00:20:53.962648+00
77	2020-11-10 00:22:41.133393+00
78	2020-11-10 00:22:41.140514+00
79	2020-11-10 00:43:10.404765+00
80	2020-11-10 21:10:16.770304+00
81	2020-11-25 18:59:03.108977+00
82	2020-11-25 18:59:03.109345+00
83	2020-11-27 19:43:23.783054+00
84	2020-11-28 18:50:04.458448+00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
1	10	ryan	34234234243	123 lfz	2020-10-26 20:20:52.57498+00
2	14	Ryan	24234	23423f sfs	2020-10-27 02:50:28.060658+00
3	15	Ben Wilson	3923092340923098	48239 Mall	2020-10-27 02:54:59.299474+00
4	16	Ryan	23423423424234	23423 Road	2020-10-27 07:50:21.660432+00
5	17	Ryan	9384929384938	34820 Road	2020-10-27 07:51:50.538068+00
6	18	Ryan	32423423423	23423 Road	2020-10-27 07:52:56.331851+00
7	19	Ryan	234234234234	12333 Road	2020-10-27 07:53:49.616689+00
8	20	Jane Doe	3243242352345	2349829 Road	2020-10-27 07:58:10.772416+00
9	21	Ryan	2342342	234234 Road	2020-10-27 08:09:25.381469+00
10	22	Ryan Griego	2938184023948293	39478 Calle Road\nLake Forest, CA 9230	2020-10-27 18:25:35.89779+00
11	23	Ryan	324234423423	34234 Road\nLake Forest, CA 92630	2020-10-27 18:30:13.30419+00
12	24	Jane Doe	2342349999	23423 Road	2020-10-27 20:08:17.620942+00
13	26	Ryan	234234342	2344 Road	2020-10-27 22:28:35.408854+00
14	27	Jane Doe	2342243	234234 Road	2020-10-28 00:16:03.754883+00
15	29	Jane Doe	23423423	23432 Car	2020-10-28 14:59:29.986513+00
16	30	Jane Doe	23234	234234 Road	2020-10-28 15:22:08.403401+00
17	31	Ryan	23434234	34234 Road	2020-10-28 15:23:32.499678+00
18	32	Ryan G	3920938408	239892 Test	2020-10-28 15:26:41.000304+00
19	38	Ryan	234324234	234234 Road	2020-10-28 23:14:44.181735+00
20	39	Ryan	39498482938999	23424 rad	2020-10-28 23:16:03.613795+00
21	43	Jane Doe	2342423423	23423 road	2020-10-28 23:18:44.104116+00
22	44	Jane Doe	234234	234234 Calle 	2020-10-29 00:15:41.244595+00
23	45	Ryan	43234343	34343 Calle	2020-10-29 00:19:09.454727+00
24	49	Ryan	2342342	398489 road	2020-10-29 00:22:54.294878+00
25	52	Ben Wilson	23982408492898	23948 Avenida Floresta	2020-10-29 00:26:07.155658+00
26	60	Ryan Griego	3983498209	23423 test	2020-10-30 20:12:39.75726+00
27	61	Ryan	2342342	234234 Road	2020-10-30 23:20:36.077441+00
28	63	Ryan Griego	9823724982374928	21036 Calle Matorral	2020-10-31 21:58:19.555599+00
29	63	Ryan Griego	3535634535345435	21036 Calle Matorral	2020-10-31 22:10:05.738402+00
30	63	Ryan Griego	2344635345353453	21036 Calle Matorral	2020-10-31 22:13:44.411754+00
31	63	Ryan Griego	3536345754683546	21036 Calle Matorral	2020-10-31 22:15:18.741808+00
32	63	Ryan Griego	2342345364564353	21036 Calle Matorral	2020-10-31 22:17:16.822634+00
33	63	Ryan Griego	2349782039832098	21036 Calle Matorral	2020-10-31 22:18:38.366267+00
34	63	Ryan Griego	2398402982309823	21036 Calle Matorral	2020-10-31 22:21:43.209588+00
35	63	Ryan Griego	7493274230928340	21036 Calle Matorral	2020-10-31 22:23:46.620083+00
36	64	Ryan Griego	3842039482093840	3498983 Road	2020-10-31 22:28:31.703111+00
37	63	Jane Doe	232423	23423 Road	2020-10-31 22:33:26.607131+00
38	65	Ryan Griego	23423	23423 Road 	2020-10-31 22:34:04.693089+00
39	66	Jane Doe	3424	2342 Road	2020-10-31 22:36:09.745737+00
40	67	Ryan Griego	23234	233 ROad	2020-10-31 22:36:49.465634+00
41	68	Ryan Griego	2323820982098098	21036 Calle Matorral	2020-10-31 22:45:45.060144+00
42	69	Ryan Griego	2332131231231231	21036 Calle Matorral	2020-10-31 22:46:20.484108+00
43	70	Ryan Griego	8472387429874298	21036 Calle Matorral	2020-10-31 22:53:26.160591+00
44	71	Ryan Griego	2342342342423424	21036 Calle Matorral	2020-10-31 22:56:09.700242+00
45	73	John Doe	2345234523452345	31948 John Road	2020-11-09 23:58:23.041072+00
46	74	John Doe	4729384729837498	31948 John Road	2020-11-09 23:59:11.695265+00
47	76	John Doe	4820398503948209	31948 John Road	2020-11-10 00:22:16.623221+00
48	78	John Doe	3242349802394809	31948 John Road	2020-11-10 00:27:42.268451+00
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription", players, mins, ages) FROM stdin;
1	Pandemic Legacy	5399	/images/pandemic-legacy.jpg, /images/pandemic-legacy-2.jpg, /images/pandemic-legacy-3.jpg, /images/pandemic-legacy-4.jpg	Your disease-fighting team must keep four deadly diseases at bay. Each game brings new surprises, and your actions will have repercussions on the next games.	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock.\\nAesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.	2 to 4	60	13+
2	Dominion	3199	/images/dominion.jpg, /images/dominion-2.jpg, /images/dominion-3.jpg, /images/dominion-4.jpg	Dominion is a deck-buildling card game where each player use the cards in their hands to either perform actions to buy select cards.	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock.\\nAesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.	2 to 4	30	13+
3	Catan	4399	/images/catan.jpg, /images/catan-2.jpg, /images/catan-3.jpg, /images/catan-4.jpg, /images/catan-5.jpg	Players take on the roles of settlers, each attempting to build and develop holdings while trading and acquiring resources.	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock.\\nAesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.	3 to 4	60	10+
4	Chess	999	/images/chess.jpg, /images/chess-2.jpg	Chess is a two-player strategy game played on a checkered board with 64 squares arranged in an 8x8 grid.	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock.\\nAesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.	2	60	8+
5	Mastermind	1399	/images/mastermind.jpg, /images/mastermind-2.jpg	The Codemaker sets a secret code, and the Codebreaker tries to match the code using logic, deduction, and even a little bit of luck.	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock.\\nAesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.	2	10	8+
6	Scrabble	1899	/images/scrabble.jpg, /images/scrabble-2.jpg, /images/scrabble-3.jpg	Put letters together, build words, add up your points and win! This classic game features the classic Scrabble equipment for a big-time word-on-word showdown.	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90's. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock.\\nAesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.	2 to 4	30	8+
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 850, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 84, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 48, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

