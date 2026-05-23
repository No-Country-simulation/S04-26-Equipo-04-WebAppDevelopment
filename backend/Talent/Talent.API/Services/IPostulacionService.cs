using System.Collections.Generic;
using System.Threading.Tasks;
using Talent.API.DTO;

namespace Talent.API.Services
{
    public interface IPostulacionService
    {
        Task<PostulacionResponseDTO> AplicarAsync(CreatePostulacionDTO dto, long usuarioId);
        Task<List<PostulacionResponseDTO>> ListarMisPostulacionesAsync(long usuarioId);
        Task<List<PostulacionResponseDTO>> ListarPorVacanteAsync(long vacanteId, long empresaId);
        Task<PostulacionResponseDTO> UpdateEstadoAsync(long id, UpdatePostulacionEstadoDTO dto, long empresaId);
    }
}
