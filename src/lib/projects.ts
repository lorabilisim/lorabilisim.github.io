export type ProjectVisual = "mediseg" | "hafiza" | "skylink";

export type Project = {
  slug: string;
  name: string;
  title: string;
  category: string;
  summary: string;
  visual: ProjectVisual;
  lead: string;
  problem: string;
  approach: string;
  capabilities: { title: string; text: string }[];
  flow: { title: string; text: string }[];
  useCases: string[];
  tech: string[];
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "mediseg",
    name: "MediSeg",
    title: "MediSeg: Tıbbi Görüntü Segmentasyonu",
    category: "Yapay Zeka & Sağlık",
    summary:
      "MR ve BT görüntülerinde tümörlerin derin öğrenme ile otomatik tespiti.",
    visual: "mediseg",
    lead: "MediSeg, MR ve BT kesitlerinde tümör bölgelerini derin öğrenme ile otomatik olarak işaretleyen bir tıbbi görüntü segmentasyonu projesidir.",
    problem:
      "Radyolojik görüntülerde tümör sınırlarının kesit kesit elle çizilmesi uzun süren, yorucu bir iştir ve sonuç uzmandan uzmana değişebilir. Görüntü hacmi arttıkça bu yük, hekimin asıl değerlendirmeye ayırabileceği zamanı daraltır.",
    approach:
      "MediSeg, segmentasyon adımını otomatikleştirerek hekime hazır bir ön işaretleme sunar. Model şüpheli bölgeyi piksel düzeyinde belirler; son değerlendirme ve karar her zaman uzmanda kalır. Amacımız hekimin yerini almak değil, tekrarlayan işi azaltıp tutarlılığı artırmaktır.",
    capabilities: [
      {
        title: "Otomatik segmentasyon",
        text: "Tümör bölgeleri kesit üzerinde piksel düzeyinde, elle çizime gerek kalmadan işaretlenir.",
      },
      {
        title: "MR ve BT desteği",
        text: "Farklı görüntüleme yöntemlerinden gelen veriler aynı iş akışı içinde ele alınır.",
      },
      {
        title: "Karar destek odağı",
        text: "Çıktılar uzmanın inceleyip düzeltebileceği bir ön değerlendirme olarak sunulur.",
      },
      {
        title: "Araştırmaya açık yapı",
        text: "Akademik çalışmalarda veri etiketleme ve karşılaştırmalı değerlendirme için kullanılabilir.",
      },
    ],
    flow: [
      { title: "Görüntü alımı", text: "MR veya BT kesitleri sisteme aktarılır." },
      { title: "Ön işleme", text: "Görüntüler modele uygun biçimde normalize edilir." },
      { title: "Segmentasyon", text: "Derin öğrenme modeli tümör bölgesini işaretler." },
      { title: "Uzman incelemesi", text: "Hekim sonucu kontrol eder ve karar verir." },
    ],
    useCases: [
      "Radyolojide karar destek",
      "Tedavi planlama öncesi ön işaretleme",
      "Klinik araştırmalarda veri etiketleme",
    ],
    tech: ["Derin Öğrenme", "Görüntü Segmentasyonu", "MR / BT", "Medikal Görüntü İşleme"],
    note: "MediSeg bir Ar-Ge projesidir; tek başına tanı koymak için tasarlanmamıştır.",
  },
  {
    slug: "kurumsal-hafiza",
    name: "Kurumsal Hafıza",
    title: "Kurumsal Hafıza Asistanı",
    category: "LLM & RAG",
    summary: "Şirket içi dokümanlar üzerinde çalışan Private Cloud SLM çözümü.",
    visual: "hafiza",
    lead: "Kurumsal Hafıza Asistanı, şirket içi dokümanlara dayanarak soruları yanıtlayan ve tamamen kurumun kendi altyapısında çalışan bir yapay zekâ asistanıdır.",
    problem:
      "Kurumların bilgisi prosedürlere, raporlara, sözleşmelere ve teknik dokümanlara dağılmış durumdadır. Aranan bilgiye ulaşmak zaman alır, bilgi çoğu zaman birkaç kişinin hafızasında kalır. Genel bulut tabanlı yapay zekâ servislerine gizli doküman göndermek ise birçok kurum için kabul edilebilir değildir.",
    approach:
      "Çözümümüz iki bileşeni bir araya getirir: kurumun kendi sunucularında çalışabilecek kadar hafif bir küçük dil modeli (SLM) ve yanıtı ilgili dokümanlardan besleyen RAG mimarisi. Asistan soruyu alır, ilgili doküman parçalarını bulur ve yanıtını bu kaynaklara dayandırır. Veri kurumun dışına çıkmaz.",
    capabilities: [
      {
        title: "Veri kurumda kalır",
        text: "Model ve doküman indeksi Private Cloud üzerinde, kurumun kontrolünde çalışır.",
      },
      {
        title: "Kaynağa dayalı yanıt",
        text: "Yanıtlar şirket dokümanlarından getirilen içerikle üretilir; dayandığı kaynak görülebilir.",
      },
      {
        title: "Hafif model",
        text: "SLM yaklaşımı sayesinde büyük modellere kıyasla daha mütevazı donanımla çalışır.",
      },
      {
        title: "Doğal dilde soru",
        text: "Çalışanlar anahtar kelime aramak yerine sorularını günlük dille sorar.",
      },
    ],
    flow: [
      { title: "Dokümanlar", text: "Şirket içi içerikler sisteme alınır." },
      { title: "İndeksleme", text: "İçerik anlamsal aramaya uygun parçalara ayrılır." },
      { title: "Getirme", text: "Soruyla en ilgili parçalar bulunur." },
      { title: "Yanıt", text: "SLM, getirilen içeriğe dayanarak yanıt üretir." },
    ],
    useCases: [
      "İç bilgi bankası ve destek",
      "Yeni çalışan oryantasyonu",
      "Prosedür ve teknik doküman sorgulama",
    ],
    tech: ["SLM", "RAG", "Private Cloud", "Anlamsal Arama"],
  },
  {
    slug: "skylink",
    name: "SkyLink",
    title: "SkyLink: LoRaWAN Haberleşmeli Dron",
    category: "IoT & Otonom Sistemler",
    summary: "GSM'siz alanlarda LoRaWAN ile veri aktaran otonom afet dronu.",
    visual: "skylink",
    lead: "SkyLink, GSM kapsamasının olmadığı veya devre dışı kaldığı bölgelerde LoRaWAN üzerinden veri aktaran otonom bir afet dronudur.",
    problem:
      "Afetlerin hemen ardından en kritik ihtiyaç sahadan gelen bilgidir; ancak aynı anlarda GSM altyapısı çoğu zaman hasar görür veya aşırı yüklenir. Kırsal ve dağlık bölgelerde ise kapsama zaten sınırlıdır. Haberleşme kesildiğinde müdahale ekipleri sahayı göremeden karar vermek zorunda kalır.",
    approach:
      "SkyLink, haberleşmeyi GSM'e bağımlı olmaktan çıkarır. Dron görevini otonom olarak yürütür ve topladığı veriyi uzun menzilli, düşük güç tüketimli LoRaWAN bağlantısı üzerinden merkeze iletir. Böylece altyapının çalışmadığı bölgelerden de veri akışı sürdürülebilir.",
    capabilities: [
      {
        title: "GSM'den bağımsız",
        text: "Veri aktarımı LoRaWAN üzerinden yapılır; baz istasyonuna ihtiyaç duymaz.",
      },
      {
        title: "Otonom görev",
        text: "Dron belirlenen görevi operatör müdahalesine gerek kalmadan yürütür.",
      },
      {
        title: "Uzun menzil, düşük güç",
        text: "LoRa modülasyonu düşük enerjiyle uzun mesafelere veri taşımaya uygundur.",
      },
      {
        title: "Afet odaklı tasarım",
        text: "Altyapının çalışmadığı senaryolar için, sahadan merkeze bilgi akışı hedeflenir.",
      },
    ],
    flow: [
      { title: "Görev planı", text: "Taranacak bölge ve rota belirlenir." },
      { title: "Otonom uçuş", text: "Dron rotayı kendi başına izler." },
      { title: "LoRaWAN aktarımı", text: "Veri uzun menzilli bağlantıyla iletilir." },
      { title: "Merkezde izleme", text: "Ekipler sahadan gelen veriyi takip eder." },
    ],
    useCases: [
      "Afet sonrası durum tespiti",
      "Arama kurtarma ekiplerine destek",
      "Kapsama dışı kırsal alanların izlenmesi",
    ],
    tech: ["LoRaWAN", "Otonom İHA", "IoT", "Sensör Ağları"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
