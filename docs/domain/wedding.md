# Wedding Domain

## Couple

- Groom: Gustavo.
- Bride: Ana.
- Site tone: warm, elegant, direct, and in Portuguese.

## Public Pages

### Home

The home page should feel like the wedding invitation:

- Hero with Gustavo and Ana as the first visual/text signal.
- Ceremony/reception section.
- Story or message section.
- Gift list call-to-action.
- RSVP or contact section when defined.
- Smooth scroll and subtle scroll animation.

### Gift List

Guests can browse gifts and choose one or more items. Gifts represent symbolic contributions or real household/travel items.

Gift states:

- `available`: can be selected.
- `reserved`: checkout started but payment not confirmed.
- `purchased`: payment confirmed.

### Checkout

Checkout confirms selected gifts, asks for guest email, creates a payment, and displays Pix QR Code plus copy/paste code.

Required fields:

- Email.
- Selected gift ids.
- Total amount.

Optional fields:

- Guest name.
- Message to the couple.

## Success Criteria

- Guests understand they are gifting Gustavo and Ana.
- Checkout is simple on mobile.
- Pix details are visible, copyable, and trustworthy.
- Payment state is persisted in Supabase.
