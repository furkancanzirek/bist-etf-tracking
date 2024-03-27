export interface Env {
  DB: D1Database;
}
export default {
  async fetch(request, env) {
    console.log(request, env);
    
    const { method, url } = request;

    // URL'nin sonu "/volumes" ile bittiğinde verileri getirme
    if (method.toUpperCase() === "GET" && url.endsWith("/volumes")) {
      return await fetchVolumes(request, env);
    }
    if (method.toUpperCase() === "POST" && url.endsWith("/volumes")) {
      return await insertVolumes(request, env);
    }
    // URL'nin sonu "/prices" ile bittiğinde verileri getirme
    if (method.toUpperCase() === "GET" && url.endsWith("/prices")) {
      return await fetchPrices(request, env);
    }

    // URL'nin sonu "/prices" ile bittiğinde verileri ekleme veya güncelleme
    if (method.toUpperCase() === "POST" && url.endsWith("/prices")) {
      return await insertOrUpdatePrices(request, env);
    }

    // Diğer durumlarda 404 Not Found yanıtı döndür
    return new Response("Not Found", { status: 404 });

    async function fetchVolumes(request, env) {
      try {
        let results = await env.DB.prepare("SELECT * FROM volumes").all();

        // JSON formatında yanıtı oluştur
        return new Response(JSON.stringify(results), {
          headers: { "content-type": "application/json" },
        });
      } catch (error) {
        console.error("Veritabanı hatası:", error);
        return new Response("Veritabanı hatası", { status: 500 });
      }
    }

    async function insertOrUpdatePrices(request, env) {
      let body = await request.clone().json();

      try {
        let values = [];
        for (let entry of body) {
          let name = entry.name.replace("'", "''");
          let change = entry.change.replace(",", ".");
          values.push(`('${name}', ${change})`);
        }
        let query = `INSERT OR REPLACE INTO prices (name, change) VALUES ${values.join(
          ", "
        )};`;

        // Veritabanına ekle veya güncelle
        await env.DB.exec(query);

        return new Response("Veriler başarıyla eklendi veya güncellendi", {
          status: 200,
        });
      } catch (error) {
        console.error("Veritabanı hatası:", error);
        return new Response("Veritabanı hatası", { status: 500 });
      }
    }

    async function fetchPrices(request, env) {
      try {
        // Veritabanından prices verilerini al
        let results = await env.DB.prepare("SELECT * FROM prices").all();

        // JSON formatında yanıtı oluştur
        return new Response(JSON.stringify(results), {
          headers: { "content-type": "application/json" },
        });
      } catch (error) {
        console.error("Veritabanı hatası:", error);
        return new Response("Veritabanı hatası", { status: 500 });
      }
    }

    async function insertVolumes(request, env) {
      try {
        // Gelen isteği klonlayıp JSON formatına dönüştür
        let body = await request.clone().json();

        // JSON arrayini stringe dönüştür
        let volumesString = JSON.stringify(body.volumes);

        // FundName'ı al
        let fundName = body.fundName.replace("'", "''");

        // SQL INSERT OR REPLACE INTO ifadesini oluştur
        let query = `INSERT OR REPLACE INTO volumes (fundName, volumes) VALUES ('${fundName}', '${volumesString}')`;

        // Veritabanına verileri ekleyelim veya güncelleyelim
        await env.DB.exec(query);

        // Başarılı yanıt döndürelim
        return new Response("Veriler başarıyla eklendi veya güncellendi", {
          status: 200,
        });
      } catch (error) {
        // Hata durumunda hata mesajını döndürelim
        console.error("Veritabanı hatası:", error);
        return new Response("Veritabanı hatası", { status: 500 });
      }
    }
  },

};
