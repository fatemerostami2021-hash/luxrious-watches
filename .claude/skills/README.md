# اسکیل‌های طراحی فرانت‌اند (Claude Code)

این پوشه از ریپوهای متن‌باز زیر کپی شده است. هر اسکیل فقط وقتی لود می‌شود که Claude Code آن را فراخوانی کند.
**قوانین `AGENTS.md` همیشه مقدم‌اند** (جاوااسکریپت ساده بدون TypeScript، استایل در `extra.css`/`header.css`، دوزبانه EN/FA با RTL، تم تیره و روشن). اگر اسکیلی Tailwind، shadcn یا Next پیشنهاد داد، آن را نادیده بگیر.

| اسکیل(ها) | منبع | لایسنس | commit |
|---|---|---|---|
| `impeccable` | https://github.com/pbakaus/impeccable | Apache-2.0 | d631a88 |
| `emil-design-eng`، `animate`، `improve-animations`، `review-animations`، `find-animation-opportunities`، `animation-vocabulary`، `break-ui`، `prototype`، `pick-ui-library` | https://github.com/emilkowalski/skill | MIT | e8a175d |
| `taste-skill` | https://github.com/Leonxlnx/taste-skill | MIT | 717446e |
| `frontend-design` | https://github.com/anthropics/skills | طبق `LICENSE.txt` داخل پوشه | dbd4588 |
| `ui-ux-pro-max` | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill | MIT | 50d8a7d |
| `design-taste` | https://github.com/h3nryprod01/design-taste | MIT AND Apache-2.0 | e0f7e23 |
| `superdesign` | https://github.com/superdesigndev/superdesign-skill | MIT | f9f05cd |
| `interface-design` | https://github.com/Dammyjay93/interface-design | MIT | 2f9be32 |

متن لایسنس‌ها در `_licenses/` است.

## کدام را کی استفاده کنیم
- **پایه برای ساخت صفحه‌ی جدید:** `frontend-design` + `taste-skill`
- **بازبینی و پرداخت:** `impeccable` (critique، audit، polish، animate و …)
- **انیمیشن و ظرافت UI:** `emil-design-eng` و بقیه‌ی اسکیل‌های Emil (برای افکت‌هایی مثل Text Roll)
- **پالت رنگ، فونت، استایل:** `ui-ux-pro-max`
- **داشبورد، پنل ادمین، فرم‌ها:** `interface-design`
- **چک نهایی ضد «ظاهر قالبی»:** `design-taste`
- **چند طرح موازی روی کانواس:** `superdesign` (نیاز به حساب و CLI جداگانه)

## نکات امنیتی و حریم خصوصی
- `impeccable/scripts/impeccable`: بار اول، یک باینری موتور را از GitHub Releases ‏(`pbakaus/impeccable`) دانلود و بعد از چک sha256 اجرا می‌کند. اگر نمی‌خواهی، پوشه‌ی `impeccable/scripts/` یا کل `impeccable/` را حذف کن.
- `superdesign`: با `npx --yes superdesign` کار می‌کند، نیاز به `superdesign login` دارد و زمینه‌ی UI پروژه را به سرویس Superdesign می‌فرستد. اگر نمی‌خواهی، پوشه‌ی `superdesign/` را حذف کن.
- هنگام ویرایش یا افزودن اسکیل جدید، قبل از commit محتوای اسکریپت‌هایش را مرور کن.

## به‌روزرسانی
با دستور `npx skills add <owner>/<repo>` نسخه‌ی تازه‌ی هر اسکیل را بگیر (مثلاً `npx skills add pbakaus/impeccable`).
