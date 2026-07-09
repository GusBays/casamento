function normalizePixText(value: string, maxLength: number) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s.-]/g, "")
    .trim()
    .toUpperCase()
    .slice(0, maxLength);
}

function emv(id: string, value: string) {
  return `${id}${String(value.length).padStart(2, "0")}${value}`;
}

function crc16(payload: string) {
  let crc = 0xffff;

  for (let index = 0; index < payload.length; index += 1) {
    crc ^= payload.charCodeAt(index) << 8;

    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, "0");
}

type PixPayloadInput = {
  key: string;
  receiverName: string;
  receiverCity: string;
  amountCents: number;
  txid: string;
};

export function createPixPayload({
  key,
  receiverName,
  receiverCity,
  amountCents,
  txid,
}: PixPayloadInput) {
  const pixKey = key.replace(/\D/g, "") || key;
  const merchantAccountInfo = emv("00", "br.gov.bcb.pix") + emv("01", pixKey);
  const additionalData = emv("05", normalizePixText(txid.replace(/-/g, ""), 25));
  const payloadWithoutCrc = [
    emv("00", "01"),
    emv("26", merchantAccountInfo),
    emv("52", "0000"),
    emv("53", "986"),
    emv("54", (amountCents / 100).toFixed(2)),
    emv("58", "BR"),
    emv("59", normalizePixText(receiverName, 25)),
    emv("60", normalizePixText(receiverCity, 15)),
    emv("62", additionalData),
    "6304",
  ].join("");

  return `${payloadWithoutCrc}${crc16(payloadWithoutCrc)}`;
}
