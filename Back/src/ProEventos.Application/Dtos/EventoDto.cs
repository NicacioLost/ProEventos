using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
        public class EventoDto
    {
         public int Id { get; set; }
        public string Local { get; set; }
        public string DataEvento { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        //[MinLength(4,ErrorMessage = "O Campo {0} deve ter no minimo 4 caracteres"),
        //MaxLength(50,ErrorMessage = "O Campo {0} deve ter no maximo 4 caracteres")]
        [StringLength(50, MinimumLength = 4, ErrorMessage = "O campo {0} deve ter no minimo 4 e no maximo 50 caracteres. ")]
        public string Tema { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]        
        [Range(1,100000, ErrorMessage = "O campo {0} não poder ser menor que 1 e maior que 100.000")]
        public int QtdePessoas { get; set; }


        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", ErrorMessage = "Não é uma imagem válida. (gif, jpg, jpeg, bmp ou png)")]
        public string ImagemURL { get; set; }
        
        [Required(ErrorMessage = "O campo {0} é obrigatório")]        
        [Phone(ErrorMessage = "O campo {0} está com o numero invalido")]        
        public string Telefone { get; set; }

        [Display(Name = "e-mail")]
        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [EmailAddress(ErrorMessage = "O campo {0} precisa ser um {0} válido")]
        public string Email { get; set; }
        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> Palestrantes { get; set; }

    }
}