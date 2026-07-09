-- Seed imported from https://sites.wedy.com/ana-gustavo-be4q/lista-de-presentes
-- Prices are stored in cents, matching docs/domain/schema.sql.

insert into gifts (id, name, price, image, quotes, remaining, status)
values
  ('6bfc6b91-71c8-4e14-aab7-24e31d57284c', 'Primeiro lugar na fila do buffet', 21274, 'https://wedy-next.s3.sa-east-1.amazonaws.com/wedy-v2-MjAyNC0xMC0wOVQxNzoxODowMi4yMDlaLzEyMDAvMTIwMC8jNmZhMzczL0U5QzRCMTk0LTU4NzQtNDhGMS05Qzg1LTU2Njg1RTYxRUE2Ri5qcGVn.jpeg', 1, 1, 'available'),
  ('dd07c84d-c1f8-478d-9b7d-ff224349d926', 'Relógio para a noiva não se atrasar', 15956, 'https://wedy-next.s3.sa-east-1.amazonaws.com/wedy-v2-MjAyNC0xMC0wOVQxNzoyNDoyOS43MTVaLzEyMDAvMTU5OS8jZTFkN2NlLzY1NkM0NzEzLTI1NjgtNDIzNy04OTk0LTYxRDQ1ODhEQzZDQi5qcGVn.jpeg', 1, 1, 'available'),
  ('eddea641-5b1e-4127-8636-d0ab2b2e3a58', 'Taxa para perguntar quando o casal vai ter filhos', 21274, 'https://wedy-next.s3.sa-east-1.amazonaws.com/wedy-v2-MjAyNC0xMC0wOVQxNzowODozMy45MThaLzczNS83MTgvIzQwMzcyZC91c2FwdWcgU2hvcCBfIFJlZGJ1YmJsZS5qcGVn.jpeg', 1, 1, 'available'),
  ('374c80a7-868a-4b97-b4fc-2665f8311ac4', 'Taxa para NÃO jogar o buquê na sua direção', 15956, 'https://wedy-next.s3.sa-east-1.amazonaws.com/wedy-v2-MjAyNC0xMC0wM1QxMzoxMTowNC43OTZaLzczNS84MTcvIzMzMjgyMS9fICgyKS5qcGVn.jpeg', 1, 1, 'available'),
  ('321897df-a99b-4376-918c-476aa578e662', 'Um ano de papel higiênico para o noivo', 31911, 'https://wedy-next.s3.sa-east-1.amazonaws.com/wedy-v2-MjAyNi0wMy0xN1QxNToyMjo0MC4yOTVaLzExNzAvMTM4OS8jZDJhZjg5L1doYXRzQXBwIEltYWdlIDIwMjYtMDMtMTcgYXQgMTIuMjEuNDkuanBlZw==.jpg', 2, 2, 'available'),
  ('8f642785-7ace-4b81-8dfe-74979eb27830', 'Microondas', 63823, 'https://wedy-next.s3.sa-east-1.amazonaws.com/2022/03/25/wedy-v1-h_zdvt6dJL4hQDoJuIMOt-microondas-de-embutir-mb38t-28l-1450w-inox-electrolux-D_NQ_NP_624582-MLB25535233938_042017-F.jpg', 2, 2, 'available'),
  ('90ca6221-8194-4199-940f-04de9c65cb58', 'Jogo de panelas', 85097, 'https://wedy-next.s3.sa-east-1.amazonaws.com/2022/03/25/wedy-v1-roseF8vkJ2qocduM081FX-049859d155f5c760548eb6052b01ec7b.jpg', 3, 3, 'available'),
  ('ad912f09-ae0b-4ffe-b4e9-65b95b3b80e7', 'Banho do Ozzy no grande dia', 21274, 'https://wedy-next.s3.sa-east-1.amazonaws.com/wedy-v2-MjAyNi0wMy0xN1QxNToyODoxNS4wNDFaLzEyMDAvMTYwMC8jY2FiNzliL1doYXRzQXBwIEltYWdlIDIwMjYtMDMtMTcgYXQgMTIuMjguMDUuanBlZw==.jpg', 1, 1, 'available'),
  ('508e84b4-c98f-41b5-9954-82f4013ad43b', 'Mesa de jantar', 127646, 'https://wedy-next.s3.sa-east-1.amazonaws.com/2022/03/26/wedy-v1-UkDxZxEdLVfQaMQb9DwNV-mesa-de-jantar-6-lugares-barbara-1247-100-mdf-ype-off-white-wd25-new-ceval-291297-large.jpg', 4, 4, 'available'),
  ('f2552b61-cac2-4d53-ab9f-1ee175c05742', 'Air Fryer', 53186, 'https://wedy-next.s3.sa-east-1.amazonaws.com/wedy-v2-MjAyNi0wMy0xN1QxNTozMzozMi4xNTBaLzUwMC81MDAvI2RkYjc4Yy9haXIuanBn.jpg', 2, 2, 'available'),
  ('b93a7ec0-e68b-4c79-9456-671a5e9c1bb4', 'Jogo de cama (dos bons)', 31911, 'https://wedy-next.s3.sa-east-1.amazonaws.com/wedy-v2-MjAyNi0wMy0xN1QxNTozNToxOS43NzVaLzEyMDAvMTIwMC8jZjJmMmYxL2pvZ29fY2FtYV9wZXJjYWxfMTAwMF9maW9zXzEwMF9hbGdvZGFvX2VnaXBjaS5qcGc=.jpg', 2, 2, 'available'),
  ('499a8236-a546-4642-b428-561207ad602b', 'Escritório para o noivo', 212743, 'https://wedy-next.s3.sa-east-1.amazonaws.com/wedy-v2-MjAyNi0wMy0xN1QxNTozNzo1Mi45OTBaLzE5MjAvMTA4MC8jY2NjMWI1L3JldmlzdGEtaGF1cy1wcm9qZXRvLWRlLWFycXVpdGV0dXJhLWVzY3JpdG9yaW8tZGUtYWR2b2NhY2lhLXN1Ym1lcnNvLXN0dWRpby1hcmNoYS1kaXZ1bGdhY2FvLTUuanBn.jpg', 4, 4, 'available'),
  ('c637e1a9-6753-4bb3-801f-1dd16a4b3284', 'Box de vidro', 127646, 'https://wedy-next.s3.sa-east-1.amazonaws.com/wedy-v2-MjAyNi0wMy0xN1QxNTozOTozNC45ODhaLzExMDAvMTEwMC8jYzBiYWI0L2JveC5qcGVn.jpg', 3, 3, 'available'),
  ('5929de38-d439-4c34-80a8-a2ed47da1e7a', 'Cobertura do pátio do Apê', 531858, 'https://wedy-next.s3.sa-east-1.amazonaws.com/wedy-v2-MjAyNi0wMy0xN1QxNTo0MjowOC45ODdaLzEwODAvODgwLyNjM2M5Y2YvcGVyZ29sYWRvLWNvbS1jb2JlcnR1cmEtYmFubmVyLW1vYmlsZS5qcGc=.jpg', 5, 5, 'available'),
  ('f2d3b67e-f381-4fe3-a673-f4e35e3e681c', 'Sofá', 425487, 'https://wedy-next.s3.sa-east-1.amazonaws.com/2022/03/26/wedy-v1-DUpc5PwrYGLL2bQb_y6h7-tender-2_5s.rec_c13050_joiz_dark_grey_c13049_joiz_grey_c13046_joiz_mint_chrom_m01_.jpg', 5, 5, 'available'),
  ('8ea0691f-b2f5-47e8-8d62-96caf5ba95a7', 'Lava Louças', 319115, 'https://wedy-next.s3.sa-east-1.amazonaws.com/wedy-v2-MjAyNi0wMy0xN1QxNTo0Nzo1MC43NjJaLzU2Ny81NjcvIzYwNjA2MC8wMS1MYXZhLUxvdWNhcy1NaWRlYS0xNC1TZXJ2aWNvcy1QcmV0YS1EV0ExNFAxLkRXQTE0UDItRnJlbnRlLmpwZw==.jpg', 5, 5, 'available'),
  ('558d5bd6-7149-4128-ae73-0b2ecca40776', 'Robô aspirador para os pelos do Ozzy', 319115, 'https://wedy-next.s3.sa-east-1.amazonaws.com/wedy-v2-MjAyNi0wMy0xN1QxNTo1MDo1MC4yODlaLzExODIvMTE5OS8jZjZmOGY3L3JvYm9fMDIyMDI2LUYuanBn.jpg', 8, 8, 'available'),
  ('0d0edd74-0472-4e20-981b-312e534bff9c', 'Junker', 212743, 'https://wedy-next.s3.sa-east-1.amazonaws.com/wedy-v2-MjAyNi0wMy0xN1QxNTo1Mjo0Ni4yOTlaLzQyMC80MjAvIzgxODI4My9qdW5rZXIuanBn.jpg', 5, 5, 'available'),
  ('f54fc095-aece-4c4a-97ad-6785262f176f', 'Controle extra para não dar briga', 42549, 'https://wedy-next.s3.sa-east-1.amazonaws.com/wedy-v2-MjAyNi0wMy0xN1QxNTo1NDo1Ny42MjJaLzk3MS82ODIvI2U3ZThmMC9jb250cm9sZS5qcGc=.jpg', 1, 1, 'available'),
  ('9708bb88-80af-4873-a54f-f1ad7d72899f', 'Ajuda para a Lua de Mel', 106372, 'https://s3.sa-east-1.amazonaws.com/wedy-next/2023/04/26/wedy-v1-laVd-X2ABk2WA-sIZYwi8-wedy.jpeg', 5, 5, 'available'),
  ('7203a697-5157-4814-aa02-1546782595ec', 'Sessão de terapia para a noiva não surtar nos preparativos', 15956, 'https://wedy-next.s3.sa-east-1.amazonaws.com/wedy-v2-MjAyNi0wMy0xN1QxNTo1ODo1NS45MjJaLzI3NS8xODMvI2UzZDlkYi90ZXJhcGlhLmpwZWc=.jpg', 1, 1, 'available'),
  ('efb7ffae-1259-4b66-9601-edaaf1929f87', 'Guarda roupa', 319115, 'https://wedy-next.s3.sa-east-1.amazonaws.com/wedy-v2-MjAyNi0wMy0xN1QxNjowMjozOC44NDlaLzE1MDAvMTUwMC8jZDFiZWE1L2d1YXJkYS1yb3VwYS5qcGc=.jpg', 4, 4, 'available'),
  ('e1a8a5ae-4b20-4694-bb68-88405d0956e3', 'Jantar na casa dos noivos', 26593, 'https://wedy-next.s3.sa-east-1.amazonaws.com/wedy-v2-MjAyNi0wMy0xN1QxNjowMzo1My41MTZaLzk0MC82MjcvI2UwZGNkNC9yZWNlaXRhcy1wYXJhLWphbnRhci5qcGc=.jpg', 1, 1, 'available'),
  ('b272fa17-71ea-4690-96a5-7e9176d49fd0', 'Televisão', 372290, 'https://wedy-next.s3.sa-east-1.amazonaws.com/2022/03/26/wedy-v1-OfLbZjHQt6wH7US9hkSiO-HYLED3244NiM-2.jpg', 1, 1, 'available')
on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  image = excluded.image,
  quotes = excluded.quotes,
  remaining = excluded.remaining,
  status = excluded.status,
  updated_at = now();
