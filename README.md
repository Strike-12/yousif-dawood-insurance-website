# Yousif Dawood — Personal Professional Website

A fast, dependency-free static website for Yousif Dawood, a life insurance agent affiliated with Family First Life (FFL).

- Interactive state license verification directory with official regulator links per state
- Insurance solutions explanations (English, Spanish, Arabic with full RTL)
- Recruitment (Join Us) section with inquiry form
- Privacy-conscious forms (no data stored on any server; forms open the visitor's email app)
- No build step, no framework, no external dependencies

## Pages

| Page | File | Purpose |
| --- | --- | --- |
| Home | `index.html` | Overview of services, how it works, FFL affiliation, license preview, contact |
| Insurance Solutions | `insurance.html` | Product explanations, pricing information, carriers (pending), FAQ |
| Licensing | `licensing.html` | Interactive state directory with per-state verification links |
| Join Us | `join.html` | Recruitment information and inquiry form |
| About | `about.html` | Professional introduction, quick facts |
| Contact | `contact.html` | Phone, email, contact form |
| Privacy Policy | `privacy.html` | How information is handled |
| 404 | `404.html` | Not-found page |

## Running locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

## Deploying (GitHub Pages)

1. Repository → **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main`, folder: `/ (root)`
4. Save. HTTPS is enforced automatically on `*.github.io`.

## Editing content

### Adding or updating a state license

All licensing data lives in **`assets/js/licensing-data.js`**. Never edit the page markup for license changes.

Structure of one state:

```js
{
  code: "NV",
  name: "Nevada",
  verified: true,
  verificationUrl: "https://doi.nv.gov/licensing/",
  records: [
    {
      licenseNumber: "4275567",
      licenseClass: "Non-resident Producer / Producer Firm",
      producerType: "Non-resident Producer",
      linesOfAuthority: ["Life"],
      status: "Active",
      firstActiveDate: "10/17/2026",
      expirationDate: "10/31/2029"
    }
  ]
}
```

Rules:

- `verified: false` renders a "Details pending verification" badge and shows only the official verification link. Never set `verified: true` until the record has been confirmed against the official state portal.
- To add a state: add an entry to `window.STATE_LICENSES` and add the state name to all three languages in `assets/js/i18n.js` under `state.name.<CODE>`.
- Each URL must be the state's own official regulator or official licensing database — never a generic third-party verification site.
- Dates are shown exactly as stored. Confirm status/expiration against the official record before publishing changes.

### Translations

All text lives in **`assets/js/i18n.js`** as flat keys (`"nav.home"`, `"faq.q1"`, …) for `en`, `es`, and `ar`. HTML elements reference keys with `data-i18n="key"` (text), `data-i18n-placeholder="key"` (placeholders), or `data-i18n-attr="aria-label:key"` (attributes). Keeping the three key sets identical is required; when adding a key, add it to all three languages.

### Replacing the profile placeholder

`assets/img/avatar-placeholder.svg` is a neutral stand-in. Replace it with a real photo (same filename or update the `src` in `index.html` and `about.html`). Do not use any stock photo of another person.

### Wiring a real form backend (optional)

The forms currently build a `mailto:` to FamilyFirstLifeBusiness@gmail.com, so nothing is stored or transmitted by the website. To collect submissions server-side instead, register with a service such as Formspree and change each `form[data-form]` `action` attribute; keep the honeypot `.hp-field` field and the consent checkbox in place.

## Analytics

`main.js` pushes events to `window.dataLayer` (Google Tag Manager compatible):


- `page_view`
- `call_click`, `email_click`
- `join_click`, `ffl_link`, `license_dir_click`
- `language_select`
- `state_select`, `state_verify`
- `form_submit`, `form_spam`

No third-party analytics script is loaded by default. If you add one, configure it without collecting names, emails, or message content, and update the Privacy Policy accordingly.

## Compliance checklist before launch

- [ ] FFL compliance review of all copy, including product descriptions and the recruitment section
- [ ] Written permission for FFL branding/name usage
- [ ] Product availability confirmed for each state
- [ ] Carrier list confirmed and approved logos loaded (the carriers section shows pending placeholders)
- [ ] Every state record verified against the official regulator (only NV is verified today)
- [ ] Required insurance advertising disclosures added per state requirements
- [ ] Recruitment inquiry destination confirmed (forms currently send to FamilyFirstLifeBusiness@gmail.com)
- [ ] Recruiting role and process approved
- [ ] Spanish and Arabic insurance terminology reviewed by a professional translator
