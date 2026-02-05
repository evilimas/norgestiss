public class PublicToilet
{
    public Guid Id { get; set; } = Guid.NewGuid();  // уникальный идентификатор

    // Основные данные
    public string Name { get; set; }
    public double Latitude { get; set; }   // для отображения на карте
    public double Longitude { get; set; }

    // Информация о туалете
    public bool IsFree { get; set; }       // бесплатный или платный
    public bool HasHandicapAccess { get; set; }  // есть доступ для инвалидов
    public string Description { get; set; }

    // Фото (ссылка или путь к файлу)
    public List<string> PhotoUrls { get; set; } = new List<string>();

    // Данные по валидации
    public int Confirmations { get; set; } = 0;            // подтверждений
    public int Rejections { get; set; } = 0;                // отклонений/споров

    // Кем и когда добавлено
    public string AddedByUserId { get; set; }
    public DateTime AddedAt { get; set; } = DateTime.UtcNow;

    // Когда последний раз редактировалось
    public DateTime? LastUpdatedAt { get; set; }
    public string LastUpdatedByUserId { get; set; }

    // Список пользователей, которые уже подтвердили (чтобы не дублировать)
    public HashSet<string> ConfirmedByUserIds { get; set; } = new HashSet<string>();
}