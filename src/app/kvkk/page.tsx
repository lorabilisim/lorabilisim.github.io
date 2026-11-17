import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: "LoraLabs kişisel verilerin korunması aydınlatma metni.",
};

const sections: LegalSection[] = [
  {
    heading: "Veri Sorumlusu",
    paragraphs: [
      `6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca kişisel verileriniz, veri sorumlusu sıfatıyla ${site.legalName} ("LoraLabs") tarafından aşağıda açıklanan kapsamda işlenmektedir.`,
      `Adres: ${site.address}. E-posta: ${site.email}.`,
    ],
  },
  {
    heading: "İşlenen Kişisel Veriler",
    paragraphs: ["Bu internet sitesi üzerinden veya sitede yer alan kanallar aracılığıyla aşağıdaki veriler işlenebilir:"],
    list: [
      "İletişim verileri: Bize e-posta veya telefonla ulaştığınızda paylaştığınız ad, soyad, e-posta adresi, telefon numarası ve mesaj içeriği.",
      "Staj başvuru verileri: Başvuru formunda paylaştığınız kimlik, iletişim ve eğitim bilgileri ile başvurunuza eklediğiniz belgeler.",
    ],
  },
  {
    heading: "İşleme Amaçları",
    list: [
      "Bize ilettiğiniz soru ve taleplerin yanıtlanması,",
      "Staj başvurularının alınması ve değerlendirilmesi,",
      "İş birliği ve proje görüşmelerinin yürütülmesi,",
      "Mevzuattan doğan yükümlülüklerin yerine getirilmesi.",
    ],
  },
  {
    heading: "Hukuki Sebepler",
    paragraphs: [
      "Kişisel verileriniz, KVKK'nın 5. maddesinde yer alan; bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması, hukuki yükümlülüğün yerine getirilmesi ve ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaati hukuki sebeplerine dayanılarak, gerektiği hâllerde ise açık rızanız alınarak işlenir.",
    ],
  },
  {
    heading: "Toplama Yöntemi",
    paragraphs: [
      "Verileriniz; e-posta, telefon ve sitede yer alan staj başvuru formu aracılığıyla elektronik ortamda toplanır.",
    ],
  },
  {
    heading: "Verilerin Aktarılması",
    paragraphs: [
      "Staj başvuru formu Google Forms üzerinden sunulmaktadır; bu nedenle forma girdiğiniz veriler Google'ın sunucularında barındırılır.",
      "Bunun dışında kişisel verileriniz, yalnızca mevzuatın zorunlu kıldığı hâllerde yetkili kamu kurum ve kuruluşlarıyla paylaşılır.",
    ],
  },
  {
    heading: "Saklama Süresi",
    paragraphs: [
      "Kişisel verileriniz, işlenme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen süreler boyunca saklanır; bu sürelerin sonunda silinir, yok edilir veya anonim hâle getirilir.",
    ],
  },
  {
    heading: "Haklarınız",
    paragraphs: ["KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:"],
    list: [
      "Kişisel verilerinizin işlenip işlenmediğini öğrenme,",
      "İşlenmişse buna ilişkin bilgi talep etme,",
      "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,",
      "Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,",
      "Eksik veya yanlış işlenmişse düzeltilmesini isteme,",
      "KVKK'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme,",
      "Düzeltme ve silme işlemlerinin, verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,",
      "Münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,",
      "Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.",
    ],
  },
  {
    heading: "Başvuru",
    paragraphs: [
      `Haklarınıza ilişkin taleplerinizi ${site.email} adresine e-posta göndererek veya yukarıdaki adrese yazılı olarak iletebilirsiniz. Talepleriniz en geç otuz gün içinde yanıtlanır.`,
    ],
  },
];

export default function KvkkPage() {
  return (
    <LegalPage
      title="KVKK Aydınlatma Metni"
      intro="Kişisel verilerinizi hangi amaçlarla ve nasıl işlediğimize dair bilgilendirme."
      updated="Kasım 2026"
      sections={sections}
    />
  );
}
