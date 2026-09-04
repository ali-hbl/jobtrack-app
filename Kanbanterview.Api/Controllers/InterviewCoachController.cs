using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;

namespace Kanbanterview.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InterviewCoachController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public InterviewCoachController()
        {
            // initialise le client HTTP qui va discuter avec Ollama
            _httpClient = new HttpClient();
        }

        [HttpPost("ask")]
        public async Task<IActionResult> AskQuestion([FromBody] PromptRequest request)
        {
            // 1. Donne son rôle à l'IA
            var systemPrompt = "Tu es un recruteur technique senior très exigeant. Le candidat t'envoie un message pour un entretien. Pose-lui une seule question technique pointue en lien avec son message, de manière professionnelle et concise. Ne dis pas bonjour, pose juste la question.";

            // 2. Prépare le paquet de données pour Ollama
            var ollamaPayload = new
            {
                model = "llama3.1",
                prompt = $"{systemPrompt}\n\nCandidat : {request.Message}",
                stream = false // réponse complète d'un coup, pas mot par mot
            };

            // transforme notre objet C# en JSON
            var content = new StringContent(JsonSerializer.Serialize(ollamaPayload), Encoding.UTF8, "application/json");

            // 3. Envoie la requête à mon serveur Ollama local
            var response = await _httpClient.PostAsync("http://localhost:11434/api/generate", content);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode(500, "Le coach d'entretien est indisponible.");
            }

            // 4. Lit la réponse JSON d'Ollama et on extrait juste le texte
            var jsonResponse = await response.Content.ReadAsStringAsync();
            using var document = JsonDocument.Parse(jsonResponse);
            var aiText = document.RootElement.GetProperty("response").GetString();

            // 5. Renvoie la réponse de l'IA à notre application Angular
            return Ok(new { answer = aiText });
        }
    }

    // Le modèle de données attendu depuis Angular
    public class PromptRequest
    {
        public string Message { get; set; } = string.Empty;
    }
}