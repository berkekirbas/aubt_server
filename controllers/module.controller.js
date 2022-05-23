const ModuleModel = require("../models/module.models.js");

class ModuleController {
  async getSites(request, response) {
    const modules = await ModuleModel.find({});
    return response.status(200).json({ modules });
  }

  async create(request, response) {
    const {
      module_type,
      module_name,
      module_content_first_section,
      module_content_progress_section,
      module_content_result_section,
      module_short_description,
      module_image_url,
      module_created_by,
    } = request.body;

    if (await ModuleModel.findOne({ module_name })) {
      return response
        .status(400)
        .json({ message: "Bu modül daha önceden yazılmış" });
    }

    const module = await ModuleModel.create({
      module_type,
      module_name,
      module_short_description,
      module_content_first_section,
      module_content_progress_section,
      module_content_result_section,
      module_image_url,
      module_created_by,
    });

    return response.status(201).json({
      module,
    });
  }

  async getSite(request, response) {
    try {
      const { moduleId } = request.params;
      const module = await ModuleModel.findOne({ moduleId });
      if (!module) {
        return response.status(400).json({ message: "Modül Bulunamadı" });
      }
      return response.status(200).json({ module });
    } catch (error) {
      return response.status(500).json({ message: "Birşeyler Ters Gitti" });
    }
  }

  async update(request, response) {
    const {
      module_type,
      module_name,
      module_content_first_section,
      module_content_progress_section,
      module_content_result_section,
      module_short_description,
      module_image_url,
      module_created_by,
    } = request.body;

    const { moduleId } = request.params;

    const module = await ModuleModel.findOne({ moduleId });
    if (!module) {
      return response.status(400).json({ message: "Modül Bulunamadı" });
    }

    if (
      module_type !== module.module_type ||
      module_name !== module.module_name ||
      module_content_first_section !== module.module_content_first_section ||
      module_content_progress_section !==
        module.module_content_progress_section ||
      module_content_result_section !== module.module_content_result_section ||
      module_image_url !== module.module_image_url ||
      module_created_by !== module.module_created_by ||
      module_short_description !== module.module_short_description
    ) {
      const updatedModule = await ModuleModel.updateOne(moduleId, {
        module_type,
        module_name,
        module_content_first_section,
        module_content_progress_section,
        module_content_result_section,
        module_short_description,
        module_image_url,
        module_created_by,
      });

      response.status(200).json({ updatedModule });
    }
    return response
      .status(404)
      .json({ message: "Modül bilgileri aynı gözüküyor" });
  }
  async delete(request, response) {
    const { moduleId } = request.params;
    const deletedModule = await ModuleModel.findOne({ moduleId });

    if (!deletedModule) {
      return response.status(404).json({ message: "Modül Bulunamadı" });
    }

    await ModuleModel.deleteOne({ moduleId });
    return response.status(200).json({ deletedModule });
  }
}

module.exports = ModuleController;
