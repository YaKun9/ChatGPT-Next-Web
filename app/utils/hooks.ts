import { useMemo } from "react";
import { useAccessStore, useAppConfig } from "../store";
import { collectModelsWithDefaultModel } from "./model";

export function useAllModels() {
  const accessStore = useAccessStore();
  const configStore = useAppConfig();
  const models = useMemo(() => {
    const allModels = collectModelsWithDefaultModel(
      configStore.models,
      [configStore.customModels, accessStore.customModels].join(","),
      accessStore.defaultModel,
    );

    // 对 models 进行排序，按照 displayName 在 accessStore.customModels 中的索引升序排列
    return allModels.sort((a, b) => {
      const indexA = accessStore.customModels.indexOf(a.displayName);
      const indexB = accessStore.customModels.indexOf(b.displayName);
      return indexA - indexB;
    });
  }, [
    accessStore.customModels,
    accessStore.defaultModel,
    configStore.customModels,
    configStore.models,
  ]);
  return models;
}
