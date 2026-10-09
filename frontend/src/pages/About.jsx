import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../store.js'
const Shop = lazy(() => import('../components/ShopScene.jsx'))
const D = { en: ['About VÉRION', ['VÉRION is a concept brand built around one idea: a mechanical watch should show how it works.', 'Each model pairs a skeleton movement with a sapphire crystal, so the gear train, balance wheel and tourbillon are visible from the front.', 'The collection is offered in 316L stainless steel, grade 5 titanium and 18-carat rose gold, with a 72-hour power reserve and water resistance to 100 metres.'], 'View the collection', [['Entrance', 'The client steps into the boutique.'], ['Store lobby', 'Featured watches glow in illuminated cases.'], ['Choose a watch', 'The skeleton piece is lifted from its case.'], ['Selected', 'Every layer of the movement is revealed.']]],
  fa: ['درباره‌ی ورینون', ['ورینون یک برند مفهومی است که روی یک ایده ساخته شده: ساعت مکانیکی باید نشان دهد چطور کار می‌کند.', 'هر مدل یک موومنت اسکلتون را با کریستال یاقوت کبود ترکیب می‌کند تا چرخ‌دنده‌ها، بالانس و توربیون از روبه‌رو دیده شوند.', 'کالکشن در استیل ۳۱۶L، تیتانیوم درجه ۵ و رزگلد ۱۸ عیار عرضه می‌شود، با ۷۲ ساعت ذخیره‌ی انرژی و مقاومت در برابر آب تا ۱۰۰ متر.'], 'مشاهده‌ی کالکشن', [['ورود', 'مشتری وارد بوتیک می‌شود.'], ['لابی فروشگاه', 'ساعت‌های شاخص در ویترین‌های نورانی می‌درخشند.'], ['انتخاب ساعت', 'ساعت اسکلتون از ویترین بیرون می‌آید.'], ['انتخاب شد', 'تمام لایه‌های موومنت آشکار می‌شود.']] ] }
export default function About() {
  const d = D[useApp(s => s.lang)]
  return <><section className="aboutshop" aria-hidden="true"><Suspense fallback={null}><Shop onStep={() => {}} /></Suspense></section>
    <article className="page"><h1>{d[0]}</h1>{d[1].map((x, i) => <p key={i} className="lead">{x}</p>)}<Link className="btn" to="/collection">{d[2]}</Link></article></>
}
