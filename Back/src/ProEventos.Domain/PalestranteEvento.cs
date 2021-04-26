using System.Collections.Generic;

namespace ProEventos.Domain
{
    public class PalestranteEvento
    {
        public int PalastranteId { get; set; }
        public Palestrante Palestrante { get; set; }
        public int EventoId { get; set; }
        public Evento Evento { get; set; }
        public IEnumerable<PalestranteEvento> PalestrantesEventos { get; set; }

    }
}