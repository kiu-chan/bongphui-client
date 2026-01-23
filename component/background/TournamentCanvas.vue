<template>
  <section class="canvas-area">
    <div v-if="!tournament" class="no-data">No tournament</div>

    <div v-else class="content" :style="{ '--title-sub-gap': gap + 'px' }">
      <!-- Top / organizer -->
      <div class="top-row">
        <div
          class="organizer-wrapper"
          :class="{ 'is-draggable': dragEnabled }"
          :style="elementStyle('organizer')"
          @pointerdown="onPointerDown($event,'organizer')"
        >
          <div
            class="logo-box organizer-box"
            v-if="tournament.logoEmbedded"
            @dblclick.stop="$emit('logo-dblclick','organizer')"
          >
            <img :src="tournament.logoEmbedded" alt="logo" />
            <div v-if="activeLogoTarget === 'organizer'" class="logo-editor-controls" data-no-export>
              <button @click.stop="$emit('trigger-logo','organizer')">Thay logo</button>
              <button @click.stop="$emit('remove-element','organizer')">Xóa</button>
            </div>
          </div>

          <ContentEditable
            v-else
            class="organizer-placeholder"
            :tag="'div'"
            v-model="localTexts.organizerText"
            :editable="editingState.organizerText"
            data-key="organizerText"
            @dblclick.stop="$emit('enable-edit','organizerText')"
            @blur="onBlurEditable('organizerText')"
          >
          </ContentEditable>

        </div>
      </div>

      <!-- Center -->
      <div class="center-block" :style="[ elementStyle('center') ]" @pointerdown="onPointerDown($event,'center')">
        <div class="center-logo" @dblclick.stop="$emit('logo-dblclick','center')">
          <div class="logo-box center-logo-box" v-if="tournament.logoEmbedded">
            <img :src="tournament.logoEmbedded" alt="logo" />
            <div v-if="activeLogoTarget === 'center'" class="logo-editor-controls" data-no-export>
              <button @click.stop="$emit('trigger-logo','center')">Thay logo</button>
              <button @click.stop="$emit('remove-element','center')">Xóa</button>
            </div>
          </div>
        </div>

        <ContentEditable
          class="title"
          :tag="'h1'"
          v-model="localTexts.title"
          :editable="editingState.title"
          data-key="title"
          @dblclick.stop="$emit('enable-edit','title')"
          @blur="onBlurEditable('title')"
        />

        <ContentEditable
          v-if="localTexts.subtitle"
          class="subtitle"
          :tag="'h2'"
          v-model="localTexts.subtitle"
          :editable="editingState.subtitle"
          data-key="subtitle"
          @dblclick.stop="$emit('enable-edit','subtitle')"
          @blur="onBlurEditable('subtitle')"
        />
      </div>

      <!-- Teams -->
      <div class="teams-row" @pointerdown="onPointerDown($event,'teamsGroup')" :style="elementStyle('teamsGroup')">
        <div
          v-for="(team, idx) in teams"
          :key="`team-${idx}`"
          class="team"
          :style="elementStyle(`team-${idx}`)"
          @pointerdown.stop="onPointerDown($event,`team-${idx}`)"
        >
          <div class="logo-box team-logo-box" @dblclick.stop="$emit('logo-dblclick',`team-${idx}`)">
            <img v-if="team.logoEmbedded" :src="team.logoEmbedded" :alt="team.name" />
            <div v-if="activeLogoTarget === `team-${idx}`" class="logo-editor-controls" data-no-export>
              <button @click.stop="$emit('trigger-logo',`team-${idx}`)">Thay logo</button>
              <button @click.stop="$emit('remove-element',`team-${idx}`)">Xóa</button>
            </div>
          </div>

          <ContentEditable
            class="team-name"
            :tag="'div'"
            v-model="localTexts[`team-${idx}`]"
            :editable="editingState[`team-${idx}`]"
            :data-key="`team-${idx}`"
            @dblclick.stop="$emit('enable-edit',`team-${idx}`)"
            @blur="onBlurEditable(`team-${idx}`)"
          />
        </div>
      </div>

      <!-- Custom Images -->
      <div v-for="img in customImages" :key="img.id" class="custom-image-wrapper"
           :style="elementStyle(`img-${img.id}`)"
           @pointerdown.stop="onPointerDown($event,`img-${img.id}`)">
        <div class="logo-box custom-image-box">
          <img :src="img.dataUrl" alt="custom" />
          <div class="logo-editor-controls" data-no-export>
            <button @click.stop="$emit('trigger-image', img.id)">Thay ảnh</button>
            <button @click.stop="$emit('remove-element', `img-${img.id}`)">Xóa</button>
          </div>
        </div>
      </div>

      <!-- Custom Texts -->
      <div v-for="ct in customTexts" :key="ct.id" class="custom-text-wrapper"
           :style="elementStyle(`custom-${ct.id}`)"
           @pointerdown.stop="onPointerDown($event,`custom-${ct.id}`)">
        <ContentEditable
          class="custom-text"
          :tag="'div'"
          v-model="localTexts[`custom-${ct.id}`]"
          :editable="editingState[`custom-${ct.id}`]"
          :data-key="`custom-${ct.id}`"
          @dblclick.stop="$emit('enable-edit',`custom-${ct.id}`)"
          @blur="onBlurEditable(`custom-${ct.id}`)"
        />
        <div class="logo-editor-controls" data-no-export>
          <button @click.stop="$emit('remove-element', `custom-${ct.id}`)">Xóa</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, watch } from "vue";
import ContentEditable from "./ContentEditable.vue";

export default defineComponent({
  name: "TournamentCanvas",
  components: { ContentEditable },
  props: {
    tournament: { type: Object, required: true },
    teams: { type: Array, required: true },
    positions: { type: Object, required: true },
    editableTexts: { type: Object, required: true },
    editingState: { type: Object, required: true },
    dragEnabled: { type: Boolean, default: false },
    showEditHints: { type: Boolean, default: true },
    gap: { type: Number, default: 24 },
    activeLogoTarget: { type: String, default: null },
    customTexts: { type: Array, default: () => [] },
    customImages: { type: Array, default: () => [] }
  },
  emits: ['start-drag','enable-edit','disable-edit','editable-input','logo-dblclick','trigger-logo','remove-element','trigger-image'],
  setup(props, { emit }) {
    // create a local copy to avoid Vue replacing innerText while editing;
    // keep it in sync: when local changes emit editable-input; when prop editableTexts changes (external) update local if not focused
    const localTexts = reactive({ ...props.editableTexts });

    // sync from parent editableTexts -> localTexts when parent changes
    watch(
      () => props.editableTexts,
      (next) => {
        Object.keys(next).forEach((k) => {
          if (localTexts[k] !== next[k]) localTexts[k] = next[k];
        });
      },
      { deep: true }
    );

    // emit when local changes (ContentEditable emits update:modelValue via v-model binding: Vue takes care)
    watch(
      () => ({ ...localTexts }),
      (next) => {
        // bubble changes up as editable-input events for each changed key
        Object.keys(next).forEach((k) => {
          if (props.editableTexts[k] !== next[k]) {
            emit('editable-input', k, { target: { innerText: next[k] } } as any);
          }
        });
      },
      { deep: true }
    );

    function emitStartDrag(e: PointerEvent, key: string) {
      emit('start-drag', { originalEvent: e, key });
    }

    function elementStyle(key: string) {
      const p = props.positions[key] || { x: 0, y: 0 };
      return { transform: `translate(${p.x}px, ${p.y}px)` };
    }

    function onPointerDown(e: PointerEvent, key: string) {
      if (!props.dragEnabled) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.closest('[contenteditable]') || target.closest('[data-key]'))) {
        return;
      }
      if (e.detail && e.detail > 1) return;
      e.preventDefault();
      emitStartDrag(e, key);
    }

    function onBlurEditable(key: string) {
      // bubble the final value up
      emit('editable-input', key, { target: { innerText: (localTexts as any)[key] } } as any);
      emit('disable-edit', key);
    }

    return { localTexts, elementStyle, onPointerDown, onBlurEditable };
  }
});
</script>

<style scoped>
.canvas-area { position:relative; }
.top-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; }
.logo-box { position:relative; display:inline-flex; align-items:center; justify-content:center; background: rgba(255,255,255,0.04); border-radius:12px; padding:6px; overflow:hidden; }
.organizer-box { height:60px; width:160px; border-radius:8px; }
.center-logo-box { width:140px; height:140px; border-radius:12px; margin:0 auto; display:block; }
.team-logo-box { width:84px; height:84px; border-radius:50%; }
.custom-image-box { width:120px; height:120px; border-radius:12px; }
.logo-box img { max-width:100%; max-height:100%; display:block; }
.center-block { display:flex; flex-direction:column; align-items:center; gap:10px; margin:36px 0 48px; position:relative; }
.title { font-weight:800; color:#ffd74d; text-transform:uppercase; font-size:48px; margin:0; text-align:center; }
.subtitle { color:rgba(255,255,255,0.95); font-size:18px; margin-top: var(--title-sub-gap, 28px); text-align:center; }
.teams-row { display:flex; flex-wrap:wrap; gap:18px; justify-content:center; align-items:center; padding:20px 8px; margin-bottom:28px; }
.team { flex:0 1 96px; display:flex; flex-direction:column; align-items:center; gap:8px; text-align:center; min-width:72px; max-width:120px; }
.team-name { color:#fff; font-size:14px; line-height:1.2; max-width:96px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.logo-editor-controls { position:absolute; bottom:6px; left:50%; transform:translateX(-50%); display:flex; gap:6px; z-index:80; }
.logo-editor-controls button { background: rgba(0,0,0,0.6); color:#fff; border:1px solid rgba(255,255,255,0.12); padding:6px 8px; border-radius:6px; font-size:12px; }
.organizer-placeholder { color:#fff; padding:8px 12px; background:rgba(255,255,255,0.03); border-radius:6px; }

/* custom element styles */
.custom-image-wrapper { position:relative; display:inline-block; margin:8px; }
.custom-text-wrapper { position:relative; display:inline-block; margin:8px; }
.custom-text { color:#fff; background: rgba(0,0,0,0.25); padding:6px 10px; border-radius:6px; font-size:16px; }

/* responsiveness */
@media (max-width: 760px) {
  .title { font-size: 28px; }
}
</style>