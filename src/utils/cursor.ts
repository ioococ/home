/**
 * 定义坐标位置接口
 */
interface Position {
  x: number;
  y: number;
}

/**
 * 定义光标位置接口，包含当前位置和前一个位置
 */
interface CursorPosition {
  curr: Position | null;
  prev: Position | null;
}

// 存储主光标实例
let mainCursor: Cursor;

/**
 * 线性插值函数
 * @param a 起始值
 * @param b 目标值
 * @param n 插值因子(0-1)
 * @returns 插值结果
 */
const lerp = (a: number, b: number, n: number): number => (1 - n) * a + b * n;

/**
 * 获取元素的计算样式
 * @param el HTML元素
 * @param attr 样式属性名
 * @returns 样式值或false
 */
const getStyle = (el, attr): string | false => {
  try {
    return window.getComputedStyle ? window.getComputedStyle(el)[attr] : el.currentStyle[attr];
  } catch (e) {
    console.error(e);
  }
  return false;
};

/**
 * 初始化光标
 * @returns Cursor实例
 */
const cursorInit = () => {
  mainCursor = new Cursor();
  return mainCursor;
};

/**
 * 自定义光标类
 */
class Cursor {
  private pos: CursorPosition; // 光标位置信息
  private pt: string[]; // 存储指针样式元素
  private cursor!: HTMLDivElement; // 光标DOM元素
  private scr!: HTMLStyleElement; // 样式元素

  constructor() {
    this.pos = {
      curr: null,
      prev: null,
    };
    this.pt = [];
    this.create();
    this.init();
    this.render();
  }

  /**
   * 移动光标到指定位置
   */
  move(left: number, top: number) {
    this.cursor.style["left"] = `${left}px`;
    this.cursor.style["top"] = `${top}px`;
  }

  /**
   * 创建光标元素和相关样式
   */
  create() {
    if (!this.cursor) {
      this.cursor = document.createElement("div");
      this.cursor.id = "cursor";
      this.cursor.classList.add("xs-hidden");
      this.cursor.classList.add("hidden");
      document.body.append(this.cursor);
    }

    // 收集所有具有pointer样式的元素
    var el = document.getElementsByTagName("*");
    for (let i = 0; i < el.length; i++)
      if (getStyle(el[i], "cursor") == "pointer") this.pt.push(el[i].outerHTML);

    // 添加自定义光标样式
    document.body.appendChild((this.scr = document.createElement("style")));
    this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='10px' height='10px'><circle cx='4' cy='4' r='4' fill='white' /></svg>") 4 4, auto !important}`;
  }

  /**
   * 刷新光标状态
   */
  refresh() {
    this.scr.remove();
    this.cursor.classList.remove("active");
    this.pos = {
      curr: null,
      prev: null,
    };
    this.pt = [];

    this.create();
    this.init();
    this.render();
  }

  /**
   * 初始化光标事件监听
   */
  init() {
    // 鼠标移动事件
    document.onmousemove = (e) => {
      this.pos.curr == null && this.move(e.clientX - 8, e.clientY - 8);
      this.pos.curr = {
        x: e.clientX - 8,
        y: e.clientY - 8,
      };
      this.cursor.classList.remove("hidden");
    };
    // 鼠标进入/离开页面事件
    document.onmouseenter = () => this.cursor.classList.remove("hidden");
    document.onmouseleave = () => this.cursor.classList.add("hidden");
    // 鼠标按下/释放事件
    document.onmousedown = () => this.cursor.classList.add("active");
    document.onmouseup = () => this.cursor.classList.remove("active");
  }

  /**
   * 渲染光标动画
   * 使用requestAnimationFrame实现平滑过渡
   */
  render() {
    if (this.pos.prev && this.pos.curr) {
      // 使用线性插值创建平滑动画
      this.pos.prev.x = lerp(this.pos.prev.x, this.pos.curr.x, 0.35);
      this.pos.prev.y = lerp(this.pos.prev.y, this.pos.curr.y, 0.35);
      this.move(this.pos.prev.x, this.pos.prev.y);
    } else {
      this.pos.prev = this.pos.curr;
    }
    requestAnimationFrame(() => this.render());
  }
}

export default cursorInit;
