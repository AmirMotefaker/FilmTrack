export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 border-r-4 border-blue-600 pr-3">حریم خصوصی</h1>
        <div className="space-y-4 text-gray-400 leading-relaxed">
          <p>ما در CineFan به حریم خصوصی شما احترام می‌گذاریم. این سند توضیح می‌دهد که چگونه با اطلاعات شما برخورد می‌شود:</p>
          <p><strong className="text-white">۱. اطلاعات جمع‌آوری شده:</strong> ما تنها ایمیلی که برای ثبت‌نام استفاده می‌کنید و لیست فیلم‌هایی که خودتان اضافه می‌کنید را ذخیره می‌کنیم. هیچ اطلاعات حساس دیگری مانند شماره کارت بانگی درخواست نمی‌شود.</p>
          <p><strong className="text-white">۲. امنیت داده‌ها:</strong> تمامی داده‌ها در دیتابیس امن Supabase ذخیره می‌شوند و از قابلیت Row Level Security (RLS) استفاده می‌کنیم تا هیچ‌کس جز خود شما نتواند لیست تماشای شما را تغییر دهد.</p>
          <p><strong className="text-white">۳. کوکی‌ها (Cookies):</strong> ما از کوکی‌ها فقط برای حفظ وضعیت ورود شما به سایت (Session) استفاده می‌کنیم.</p>
          <p><strong className="text-white">۴. اشتراک‌گذاری اطلاعات:</strong> ما اطلاعات شخصی شما را هرگز به هیچ شخص ثالثی نمی‌فروشیم یا منتقل نمی‌کنیم.</p>
        </div>
      </div>
    </div>
  );
}