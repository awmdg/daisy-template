<template>
  <div class="flex-1 overflow-hidden relative">
    <div class="overflow-x-auto h-full flex flex-col space-y-2">
      <table class="w-full table-auto border-separate border-spacing-y-2">
        <thead class="sticky top-0 z-10">
          <tr class="bg-gray-50 rounded-lg overflow-hidden">
            <th
              v-for="(header, index) in headers"
              :key="header.value"
              class="p-3 text-sm font-semibold text-gray-700 bg-gray-50"
              :class="[
                index === 0 ? 'rounded-l-lg' : '',
                index === headers.length - 1 && !hasActions
                  ? 'rounded-r-lg'
                  : '',
                header.align === 'center'
                  ? 'text-center'
                  : header.align === 'end'
                  ? 'text-right'
                  : 'text-left',
              ]"
            >
              {{ header.title }}
            </th>
            <th
              v-if="hasActions"
              class="p-3 rounded-r-lg bg-gray-50 text-gray-700"
            ></th>
          </tr>
        </thead>
        <tbody class="divide-y bg-white rounded-lg tbody-color overflow-hidden">
          <tr
            v-for="(item, index) in items"
            :key="getItemKey(item, index)"
            class="hover:bg-gray-50 transition"
          >
            <td
              v-for="(header, colIndex) in headers"
              :key="header.value"
              class="p-3 whitespace-nowrap"
              :class="[
                colIndex === 0 ? 'first:rounded-l-lg' : '',
                colIndex === headers.length - 1 ? 'last:rounded-r-lg' : '',
                header.align === 'center'
                  ? 'text-center'
                  : header.align === 'end'
                  ? 'text-right'
                  : 'text-left',
              ]"
            >
              <slot
                :name="`cell-${header.value}`"
                :item="item"
                :value="item[header.value]"
                :header="header"
              >
                <div
                  v-if="header.type === 'status'"
                  class="flex items-center w-fit"
                >
                  <div
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm transition-all"
                    :style="{
                      backgroundColor: getStatusColor(item[header.value])
                        .chipBg,
                      color: getStatusColor(item[header.value]).text,
                    }"
                  >
                    <span
                      class="w-2 h-2 rounded-full mr-2"
                      :style="{
                        backgroundColor: getStatusColor(item[header.value])
                          .circleBg,
                      }"
                    ></span>
                    <span class="capitalize text-xs sm:text-sm">
                      {{ item[header.value] }}
                    </span>
                  </div>
                </div>
                <div v-else-if="header.type === 'date'">
                  {{ formatDate(item[header.value]) }}
                </div>
                <div v-else>
                  {{ item[header.value] }}
                </div>
              </slot>
            </td>

            <td
              v-if="hasActions"
              class="p-3 last:rounded-r-lg relative text-right"
            >
              <button
                @click="($event) => toggleMenu(index, item, $event)"
                class="p-2 hover:bg-gray-100 rounded-full"
              >
                <slot name="action-icon" :item="item">
                  <EllipsisHorizontalIcon class="w-6 h-6 text-gray-500" />
                </slot>
              </button>
              <div
                v-if="activeMenu === index"
                class="fixed z-50"
                :style="{
                  top: `${menuPosition.top}px`,
                  left: `${menuPosition.left}px`,
                }"
              >
                <div
                  class="absolute right-0 w-44 bg-white shadow-lg rounded-lg border"
                >
                  <slot
                    name="menu-items"
                    :item="selectedItem"
                    :close-menu="closeMenu"
                  ></slot>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-if="items.length === 0">
          <tr>
            <td
              :colspan="headers.length + (hasActions ? 1 : 0)"
              class="text-center py-5 text-gray-500 font-semibold"
            >
              <slot name="empty-state">No items found.</slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div
    v-if="activeMenu !== null"
    @click="closeMenu"
    class="fixed inset-0 z-40"
  ></div>
</template>

<script setup lang="ts">
interface Props {
  headers: THeader[];
  items: any[];
  itemKey?: string;
  hasActions?: boolean;
  getStatusColor?: (status: string) => any;
}

const props = withDefaults(defineProps<Props>(), {
  headers: () => [],
  items: () => [],
  itemKey: "",
  hasActions: true,
  getStatusColor: (status: string) => ({
    chipBg: "#E5EDFF",
    text: "#3B82F6",
    circleBg: "#3B82F6",
  }),
});

const emit = defineEmits(["menu-toggle", "menu-close"]);

const activeMenu = ref<number | null>(null);
const selectedItem = ref<any>(null);
const menuPosition = ref({ top: 0, left: 0 });

const getItemKey = (item: any, index: number) => {
  return props.itemKey ? item[props.itemKey] : index;
};

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toDateString().slice(4);
};

const toggleMenu = (index: number, item: any, event: MouseEvent) => {
  if (activeMenu.value === index) {
    closeMenu();
    return;
  }

  const button = event.currentTarget as HTMLElement;
  const rect = button.getBoundingClientRect();

  menuPosition.value = {
    top: rect.bottom + window.scrollY,
    left: rect.left + window.scrollX,
  };

  activeMenu.value = index;
  selectedItem.value = item;
  emit("menu-toggle", { item, index });
};

const closeMenu = () => {
  activeMenu.value = null;
  emit("menu-close");
};
</script>
