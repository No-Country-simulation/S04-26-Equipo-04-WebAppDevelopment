using Talent.API.DTO;

namespace Talent.API.Services
{
    public interface IVacanteService
    {
        Task<VacanteResponseDTO?> GetByIdAsync(long id);
        Task<List<VacanteResponseDTO>> ListarActivasAsync();
        Task<List<VacanteResponseDTO>> ListarPorEmpresaAsync(long empresaId);
        Task<VacanteResponseDTO> CreateAsync(CreateVacanteDTO dto, long empresaId);
        Task<VacanteResponseDTO> UpdateAsync(long id, UpdateVacanteDTO dto, long empresaId);
        Task DeleteAsync(long id, long empresaId);
    }
}
