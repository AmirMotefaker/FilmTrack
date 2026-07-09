export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 border-r-4 border-blue-600 pr-3">قوانین و مقررات</h1>
        <div className="space-y-4 text-gray-400 leading-relaxed">
          <p>استفاده از سایت CineFan به معنی پذیرفتن قوانین زیر است:</p>
          <p><strong className="text-white">۱. نظرات و اسپویلرها:</strong> کاربران موظف هستند در صورت لو دادن داستان فیلم یا سریال، تیک «حاوی اسپویلر» را فعال کنند. عدم رعایت این مورد موجب حذف نظر یا مسدود شدن حساب کاربری.</p>
          <p><strong className="text-white">۲. احترام متقابل:</strong> هرگونه توهین، نژادپرستی یا رفتار زشت به سایر کاربران یا عوامل فیلم کاملاً ممنوع است.</p>
          <p><strong className="text-white">۳. محتوای غیرقانونی:</strong> CineFan یک پلتفرم ردیابی و نقد است. لینک دانلود غیرقانونی فیلم‌ها در این پلتفرم اکیداً ممنوع است.</p>
          <p><strong className="text-white">۴. حقوق نشر:</strong> تمامی اطلاعات و پوسترهای این سایت از TMDB دریافت شده و حقوق آن‌ها متعلق به سازندگان اصلی است.</p>
        </div>
      </div>
    </div>
  );
}