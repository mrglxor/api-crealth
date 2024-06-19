import axios from "axios"

export const getArticle = async(req,res,next) => {
    const { title = "", page = 1, pageSize = 10 } = req.query;
    try {
        const articles = await getApiArticle(title, parseInt(page), parseInt(pageSize));
        res.status(200).json(articles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getApiArticle = async (title = "", page = 1, pageSize = 10) => {
    const country = "id";
    const category = "health";
    const apiKey = "8b674514515b4cdbbab8b073868b5bce";
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;

    try {
        console.log(`Requesting articles from URL: ${url}`);
        const response = await axios.get(url, { responseType: "json" });
        console.log(`Received response with status: ${response.status}`);
        const articles = response.data.articles;

        // Apply regex filtering
        if (title) {
            const regex = new RegExp(title, "i");
            const filteredArticles = articles.filter(article => regex.test(article.title));
            if (filteredArticles.length === 0) {
                throw new Error("Artikel yang Anda cari tidak ditemukan!");
            }
            return filteredArticles;
        }

        if (articles.length === 0) {
            throw new Error("Artikel yang Anda cari tidak ditemukan!");
        }

        return articles;
    } catch (error) {
        console.error(`Error fetching articles: ${error.message}`);
        if (error.response) {
            console.error(`Response data: ${error.response.data}`);
        }
        throw new Error("Artikel yang Anda cari tidak ditemukan!");
    }
}