using Microsoft.AspNetCore.Mvc;
using ProjectName.Data;
using ProjectName.Models;
using System.Linq;

namespace ProjectName.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColaboradoresController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ColaboradoresController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Listar todos os colaboradores
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.Colaboradores.ToList());
        }

        // Buscar colaborador pelo ID
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var colaborador = _context.Colaboradores.Find(id);
            if (colaborador == null) return NotFound();
            return Ok(colaborador);
        }

        // Criar um colaborador
        [HttpPost]
        public IActionResult Create([FromBody] Colaborador colaborador)
        {
            if (colaborador == null) return BadRequest();
            _context.Colaboradores.Add(colaborador);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = colaborador.Id }, colaborador);
        }

        // Atualizar um colaborador
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Colaborador colaborador)
        {
            var existingColaborador = _context.Colaboradores.Find(id);
            if (existingColaborador == null) return NotFound();

            existingColaborador.Nome = colaborador.Nome;
            _context.SaveChanges();
            return NoContent();
        }

        // Excluir um colaborador
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var colaborador = _context.Colaboradores.Find(id);
            if (colaborador == null) return NotFound();

            _context.Colaboradores.Remove(colaborador);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
