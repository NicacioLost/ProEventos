namespace ProEventos.Application.Dtos
{
    public class RedeSocialDto
    {
           public int Id { get; set; }
        public string nome { get; set; }
        public string URL { get; set; }
        public int? EventoId { get; set; }
        public EventoDto Evento { get; set; }
        public int? PalestranteId { get; set; }
        public PalestranteDto Palestrante { get; set; }
    }
}