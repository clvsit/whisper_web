import os
import json


def get_root_dir() -> str:
    """
    获取项目的根目录
    :return str 项目的根目录绝对路径
    """
    cur_path = os.path.abspath(os.path.dirname(__file__))
    proj_path = cur_path[:cur_path.find("core")]
    return proj_path


def get_system_config(config_name: str = None) -> dict:
    """
    获取系统配置
    :param config_name: 获取指定名称的配置信息
    :return dict 系统配置字典
    """
    root_dir = get_root_dir()

    with open(os.path.join(root_dir, "setting.json"), "r", encoding="utf-8") as file:
        config_dict = json.load(file)
    
    return config_dict.get(config_name, {}) if config_name else config_dict


if __name__ == "__main__":
    print(get_root_dir())